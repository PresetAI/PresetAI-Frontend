import { Sidebar } from '../../layouts';
import { useParams } from 'react-router-dom';
import ProjectFileManagementTable from '@/pages/ProjectDetailFileManagement/components/ProjectFileManagementTable';
import { getProjectFileByProjectIdUsingPost } from '@/services/ProjectController';
import { useEffect, useState } from 'react';

function ProjectDetailFileManagement() {
  // get params from url
  const { projectId } = useParams<{ projectId: string | undefined }>();
  const [projectFileList, setProjectFileList] = useState<API.ProjectFileList[]>(
    []
  );

  const getProjectFileByProjectId = async () => {
    const res = await getProjectFileByProjectIdUsingPost(projectId);
    if (res.data.code === 200) {
      setProjectFileList(res.data.data);
    }
    console.log(res.data.data);
  };

  useEffect(() => {
    getProjectFileByProjectId();
  }, []);

  return (
    <Sidebar
      projectId={projectId}
      component={
        // <section className="grid grid-cols-2 gap-20">
        // <section className="grid grid-cols-1 sm:grid-cols-9 justify-items-start place-items-start mx-auto px-8 sm:px-12 lg:px-16">
        <section className="h-[100vh]">
          <div className="">
            <ProjectFileManagementTable projectFileList={projectFileList} />
          </div>
        </section>
      }
    />
  );
}

export default ProjectDetailFileManagement;
