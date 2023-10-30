// React and React Router Imports
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Layouts, Components, and Services Imports
import { Sidebar } from '@/layouts';
import Title from '@/components/Title';

// Config and Context Imports
import common from '@/config/common';
import { AuthContext } from '@/contexts/auth_context';
import Steps from '@/pages/ProjectDetailQuickStart/components/Steps';
import ProjectDetailKey from '@/pages/ProjectDetailQuickStart/components/ProjectDetailKey';
import { getProjectByProjectIdUsingGet } from '@/services/ProjectController';

function ProjectDetailQuickStart() {
  // Extracting context values
  const { setProjectName, setFetchLoading, setErrorDescription } =
    useContext(AuthContext);

  // Retrieving the project ID from the URL parameters
  const { projectId } = useParams<{ projectId: string | undefined }>();

  const getProjectDetail = async () => {
    try {
      setFetchLoading(true);
      const res = await getProjectByProjectIdUsingGet(projectId);
      if (res.data.code === 200) {
        setProjectName(res.data.data.name);
      }
    } catch (error: any) {
      setErrorDescription(error.response.data.message);
    } finally {
      setFetchLoading(false);
    }
  };

  // Effect hook to fetch project details when the component mounts
  useEffect(() => {
    getProjectDetail();
  }, []);

  return (
    <Sidebar
      projectId={projectId}
      component={
        <>
          <Title
            title={common['projectDetailQuickStart.title']}
            subtitle={common['projectDetailQuickStart.subtitle']}
          />
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Steps projectId={projectId} />
            <ProjectDetailKey projectId={projectId} />
          </div>
        </>
      }
    />
  );
}

export default ProjectDetailQuickStart;
