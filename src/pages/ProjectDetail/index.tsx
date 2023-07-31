import { Sidebar } from '../../layouts';
import ProjectDetailChatbot from './components/ProjectDetailChatbot';
import ProjectDetailForm from './components/ProjectDetailForm';
import { useEffect, useState } from 'react';
import { getProjectByProjectIdUsingGet } from '@/services/ProjectController';
import { useParams } from 'react-router-dom';

function ProjectDetail() {
  // get params from url
  const { projectId } = useParams<{ projectId: string | undefined }>();
  const [projectDetailData, setProjectDetailData] = useState<API.Project>({}); // project detail

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
        // <section className="grid grid-cols-2 gap-20">
        // <section className="grid grid-cols-1 sm:grid-cols-9 justify-items-start place-items-start mx-auto px-8 sm:px-12 lg:px-16">
        <section className="h-[100vh]">
          <div className="h-full py-4 grid grid-cols-1 sm:grid-cols-9 rounded-2xl">
            <ProjectDetailChatbot projectDetailData={projectDetailData} />
            <ProjectDetailForm projectDetailData={projectDetailData} />
          </div>
        </section>
      }
    />
  );
}

export default ProjectDetail;
