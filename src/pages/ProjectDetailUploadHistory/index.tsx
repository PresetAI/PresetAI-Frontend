import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../layouts';
import { getTasksUsingGet } from '@/services/ProjectController';
import Title from '@/components/Title';
import UploadHistoryTable from '@/pages/ProjectDetailUploadHistory/components/UploadHistoryTable';
import common from '@/config/common';
import { AuthContext } from '@/contexts/auth_context';

function ProjectDetailUploadHistory() {
  const { setFetchLoading } = useContext(AuthContext);
  // get params from url
  const { projectId } = useParams<{ projectId: string | undefined }>();
  const [data, setData] = useState<API.ProjectTask[]>([]);

  const getTasksByProjectId = async () => {
    setFetchLoading(true);
    const res = await getTasksUsingGet(projectId);
    console.log(res.data.data);
    if (res.data.code === 200) {
      setData(res.data.data);
    }
    setFetchLoading(false);
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
        <>
          <Title
            title={common['projectDetailUploadHistory.title']}
            subtitle={common['projectDetailUploadHistory.subtitle']}
          />
          <div className="py-4">
            <UploadHistoryTable data={data} />
          </div>
        </>
      }
    />
  );
}

export default ProjectDetailUploadHistory;
