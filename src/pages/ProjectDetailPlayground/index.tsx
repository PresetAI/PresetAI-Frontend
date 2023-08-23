import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Sidebar } from '@/layouts';
import ProjectDetailChatbot from './components/ProjectDetailChatbot';
import ProjectDetailForm from './components/ProjectDetailForm';
import { getProjectByProjectIdUsingGet } from '@/services/ProjectController';
import Title from '@/components/Title';
import common from '@/config/common';
import { AuthContext } from '@/contexts/auth_context';

function ProjectDetailPlayground() {
  const { setProjectName, setFetchLoading } = useContext(AuthContext);
  const { projectId } = useParams<{ projectId: string | undefined }>(); // get params from url
  const [projectDetailData, setProjectDetailData] = useState<API.Project>({}); // project detail

  /*
   * Get project detail by project id
   * */
  const getProjectDetail = async () => {
    try {
      setFetchLoading(true);
      const res = await getProjectByProjectIdUsingGet(projectId);
      if (res.data.code === 200) {
        setProjectDetailData(res.data.data);
        setProjectName(res.data.data.name);
      }
    } catch (e: any) {
      console.log(e);
    }
    setFetchLoading(false);
  };

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
