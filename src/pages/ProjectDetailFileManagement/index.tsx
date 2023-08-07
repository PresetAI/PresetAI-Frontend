import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../layouts';
import ProjectFileManagementTable from '@/pages/ProjectDetailFileManagement/components/ProjectFileManagementTable';
import { getProjectFileByProjectIdUsingPost } from '@/services/ProjectController';
import Header from '@/pages/ProjectDetailFileManagement/components/Header';

function ProjectDetailFileManagement() {
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
    const res = await getProjectFileByProjectIdUsingPost(projectId);
    if (res.data.code === 200) {
      setProjectFileList(res.data.data);
    }
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
        <section className="h-[100vh] pt-10 px-10">
          <div className="pt-8">
            <Header filterText={filterText} setFilterText={setFilterText} />
            <ProjectFileManagementTable filteredFileList={filteredFileList} />
          </div>
        </section>
      }
    />
  );
}

export default ProjectDetailFileManagement;
