import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../layouts';
import ProjectFileManagementTable from '@/pages/ProjectDetailFileManagement/components/ProjectFileManagementTable';
import { getProjectFileByProjectIdUsingGet } from '@/services/ProjectController';
import common from '@/config/common';
import Title from '@/components/Title';
import { AuthContext } from '@/contexts/auth_context';
import Loader from '@/components/Loader';

function ProjectDetailFileManagement() {
  const {
    setFetchLoading,
    fetchProcessLoading,
    localization,
    setLocalizationAndLoadingFunction,
  } = useContext(AuthContext);
  // get params from url
  const { projectId } = useParams<{ projectId: string | undefined }>();
  const [projectFileList, setProjectFileList] = useState<API.ProjectFileList[]>(
    []
  );

  const [filterText, setFilterText] = useState<string>('');
  const filteredFileList = useMemo(() => {
    return projectFileList.filter((item) => {
      if (item.filename === undefined || item.filename === null) return false;
      return item.filename.toLowerCase().includes(filterText.toLowerCase());
    });
  }, [projectFileList, filterText]);

  const getProjectFileByProjectId = async () => {
    setFetchLoading(true);
    const res = await getProjectFileByProjectIdUsingGet(projectId);
    if (res.data.code === 200) {
      setProjectFileList(res.data.data);
    }
    setFetchLoading(false);
  };

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
            filterText={filterText}
            setFilterText={setFilterText}
            filteredFileList={filteredFileList}
          />
        </>
      }
    />
  );
}

export default ProjectDetailFileManagement;
