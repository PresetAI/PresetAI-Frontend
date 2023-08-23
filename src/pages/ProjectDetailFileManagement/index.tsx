import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../layouts';
import ProjectFileManagementTable from '@/pages/ProjectDetailFileManagement/components/ProjectFileManagementTable';
import { getProjectFileByProjectIdUsingGet } from '@/services/ProjectController';
import common from '@/config/common';
import Title from '@/components/Title';
import { AuthContext } from '@/contexts/auth_context';

function ProjectDetailFileManagement() {
  const { setFetchLoading } = useContext(AuthContext);
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
        // <section className="grid grid-cols-2 gap-20">
        // <section className="grid grid-cols-1 sm:grid-cols-9 justify-items-start place-items-start mx-auto px-8 sm:px-12 lg:px-16">
        <>
          <Title
            title={common['projectDetailFileManagement.title']}
            subtitle={common['projectDetailFileManagement.subtitle']}
          />
          <ProjectFileManagementTable
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
