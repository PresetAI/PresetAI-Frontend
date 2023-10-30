import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../layouts';
import Title from '@/components/Title';
import UploadHistoryTable from '@/pages/ProjectDetailUploadHistory/components/UploadHistoryTable';
import common from '@/config/common';
import { AuthContext } from '@/contexts/auth_context';
import { getTasksUsingGet } from '@/services/ProjectController';

// Define the ProjectDetailUploadHistory component
function ProjectDetailUploadHistory() {
  const { setFetchLoading } = useContext(AuthContext);
  // Get the project ID from the URL params
  const { projectId } = useParams<{ projectId: string | undefined }>();

  const [data, setData] = useState<API.ProjectTask[]>([]);

  // Function to fetch project tasks by project ID
  const getTasksByProjectId = async () => {
    setFetchLoading(true);
    const res = await getTasksUsingGet(projectId);
    if (res.data.code === 200) {
      setData(res.data.data);
    }
    setFetchLoading(false);
  };
  useEffect(() => {
    // Fetch project tasks when the component mounts
    getTasksByProjectId();
  }, []);

  return (
    <Sidebar
      projectId={projectId}
      component={
        <>
          {/* Title and subtitle for the page */}
          <Title
            title={common['projectDetailUploadHistory.title']}
            subtitle={common['projectDetailUploadHistory.subtitle']}
          />
          {/* Upload history table */}
          <div className="py-4">
            <UploadHistoryTable data={data} />
          </div>
        </>
      }
    />
  );
}

export default ProjectDetailUploadHistory;
