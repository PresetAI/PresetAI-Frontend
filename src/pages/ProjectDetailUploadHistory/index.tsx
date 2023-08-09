import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../layouts';
import { getTasksUsingGet } from '@/services/ProjectController';
import Title from '@/components/Title';
import UploadHistoryTable from '@/pages/ProjectDetailUploadHistory/components/UploadHistoryTable';

function ProjectDetailUploadHistory() {
  // get params from url
  const { projectId } = useParams<{ projectId: string | undefined }>();
  const [data, setData] = useState<API.ProjectTask[]>([]);

  const getTasksByProjectId = async () => {
    const res = await getTasksUsingGet(projectId);
    console.log(res.data.data);
    if (res.data.code === 200) {
      setData(res.data.data);
    }
  };

  useEffect(() => {
    getTasksByProjectId();
  }, []);

  return (
    <Sidebar
      projectId={projectId}
      component={
        // <section className="grid grid-cols-2 gap-20">
        // <section className="grid grid-cols-1 sm:grid-cols-9 justify-items-start place-items-start mx-auto px-8 sm:px-12 lg:px-16">
        <section className="h-[100vh] pt-10 px-10">
          <div className="pt-8">
            <Title title="Upload Data Source History" />
            <UploadHistoryTable data={data} />
          </div>
        </section>
      }
    />
  );
}

export default ProjectDetailUploadHistory;
