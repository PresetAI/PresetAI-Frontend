import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Sidebar } from '@/layouts';
import ProjectDetailChatbot from './components/ProjectDetailChatbot';
import ProjectDetailForm from './components/ProjectDetailForm';
import { getProjectByProjectIdUsingGet } from '@/services/ProjectController';

function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string | undefined }>(); // get params from url
  const [projectDetailData, setProjectDetailData] = useState<API.Project>({}); // project detail

  /*
   * Get project detail by project id
   * */
  const getProjectDetail = async () => {
    try {
      const res = await getProjectByProjectIdUsingGet(projectId);
      if (res.data.code === 200) {
        setProjectDetailData(res.data.data);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProjectDetail();
  }, []);

  return (
    <Sidebar
      projectId={projectId}
      component={
        <section className="h-[100vh]">
          <div className="h-full py-4 grid grid-cols-1 sm:gap-12 sm:grid-cols-9 rounded-2xl ">
            <ProjectDetailChatbot
              projectId={projectId}
              projectDetailData={projectDetailData}
            />
            <ProjectDetailForm projectDetailData={projectDetailData} />
          </div>
        </section>
      }
    />
  );
}

export default ProjectDetail;
