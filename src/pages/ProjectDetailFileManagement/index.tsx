// React and React Router Imports
import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

// Layouts and Components Imports
import { Sidebar } from '@/layouts';
import ProjectFileManagementTable from '@/pages/ProjectDetailFileManagement/components/ProjectFileManagementTable';
import Title from '@/components/Title';
import Loader from '@/components/Loader';

// Service and Config Imports
import { getProjectFileByProjectIdUsingGet } from '@/services/ProjectController';
import common from '@/config/common';

// Context Imports
import { AuthContext } from '@/contexts/auth_context';

function ProjectDetailFileManagement() {
  // Extracting context values
  const {
    setFetchLoading,
    fetchProcessLoading,
    localization,
    setLocalizationAndLoadingFunction,
    setErrorDescription,
  } = useContext(AuthContext);

  // Extracting URL parameters
  const { projectId } = useParams<{ projectId: string | undefined }>();

  // State management for the list of project files
  const [projectFileList, setProjectFileList] = useState<API.ProjectFileList[]>(
    []
  );

  // Search parameters for filtering
  const [filterText, setFilterText] = useSearchParams({ filename: '' });
  const filename = filterText.get('filename') || '';

  // Filtering the file list based on filename
  const filteredFileList = useMemo(() => {
    return projectFileList.filter((item) => {
      if (!item.filename) return false;
      return item.filename.toLowerCase().includes(filename.toLowerCase());
    });
  }, [projectFileList, filterText]);

  // Fetch project files by project ID
  const getProjectFileByProjectId = async () => {
    setFetchLoading(true);
    try {
      const res = await getProjectFileByProjectIdUsingGet(projectId);
      if (res.data.code === 200) {
        setProjectFileList(res.data.data);
      } else {
        // Handle non-200 response codes if necessary
        setErrorDescription(res.data.message);
      }
    } catch (error: any) {
      // Log the error and handle it appropriately
      setErrorDescription(error.response.data.message);
    } finally {
      setFetchLoading(false);
    }
  };

  // Side effect to fetch project files when the component mounts
  useEffect(() => {
    getProjectFileByProjectId();
  }, []);

  return (
    <Sidebar
      projectId={projectId}
      component={
        <>
          <Loader open={fetchProcessLoading} title={localization} />
          <Title
            title={common['projectDetailFileManagement.title']}
            subtitle={common['projectDetailFileManagement.subtitle']}
          />
          <ProjectFileManagementTable
            setLocalizationAndLoadingFunction={
              setLocalizationAndLoadingFunction
            }
            projectId={projectId}
            getProjectFileByProjectId={getProjectFileByProjectId}
            filename={filename}
            setFilterText={setFilterText}
            filteredFileList={filteredFileList}
          />
        </>
      }
    />
  );
}

export default ProjectDetailFileManagement;
