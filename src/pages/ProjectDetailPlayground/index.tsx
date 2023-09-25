// React and React Router Imports
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Layouts, Components, and Services Imports
import { Sidebar } from '@/layouts';
import ProjectDetailChatbot from './components/ProjectDetailChatbot';
import ProjectDetailForm from './components/ProjectDetailForm';
import Title from '@/components/Title';
import { getProjectByProjectIdUsingGet } from '@/services/ProjectController';

// Config and Context Imports
import common from '@/config/common';
import { AuthContext } from '@/contexts/auth_context';

function ProjectDetailPlayground() {
  // Extracting context values
  const { setProjectName, setFetchLoading, setErrorDescription } =
    useContext(AuthContext);

  // Retrieving the project ID from the URL parameters
  const { projectId } = useParams<{ projectId: string | undefined }>();

  // State management for project details
  const [projectDetailData, setProjectDetailData] = useState<API.Project>({});

  /**
   * Fetch project details based on the project ID.
   * On successful fetch, set the project details and project name in the context.
   */
  const getProjectDetail = async () => {
    try {
      setFetchLoading(true);
      const res = await getProjectByProjectIdUsingGet(projectId);
      if (res.data.code === 200) {
        setProjectDetailData(res.data.data);
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
            title={common['projectDetailPlayground.title']}
            subtitle={common['projectDetailPlayground.subtitle']}
          />
          <div className="h-full py-4 grid grid-cols-1 sm:gap-12 sm:grid-cols-9 rounded-2xl ">
            <ProjectDetailChatbot
              projectId={projectId}
              projectDetailData={projectDetailData}
            />
            <ProjectDetailForm projectDetailData={projectDetailData} />
          </div>
        </>
      }
    />
  );
}

export default ProjectDetailPlayground;
