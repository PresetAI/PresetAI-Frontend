import ProjectList from './components/ProjectList';
import ProjectCreateDialog from '@/pages/Project/components/ProjectCreateDialog';
import { useContext, useEffect, useState } from 'react';
import AlertDestructive from '@/components/Alert/AlertDestructive';
import { AlertDefault } from '@/components/Alert/AlertDefault';
import { getProjectsUsingGet } from '@/services/ProjectController';
import ProjectSidebar from '@/layouts/ProjectSidebar';
import common from '@/config/common';
import Title from '@/components/Title';
import { AuthContext } from '@/contexts/auth_context';

function Project() {
  const { setFetchLoading } = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // dialog open or not
  const [alert, setAlert] = useState<null | 'default' | 'destructive'>(null);
  const [description, setDescription] = useState<string>('');
  const [projectsListData, setProjectsListData] = useState<API.Project[]>([]); // project list

  const getProjectsList = async () => {
    setFetchLoading(true);
    const res = await getProjectsUsingGet();
    try {
      if (res.data.code === 200) {
        setProjectsListData(res.data.data);
      }
    } catch (e: any) {
      console.log(e);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    getProjectsList();
  }, []);

  return (
    <ProjectSidebar
      component={
        <>
          {alert === 'destructive' && (
            <AlertDestructive description={description} />
          )}
          {alert === 'default' && <AlertDefault description={description} />}
          <Title
            title={common['projects.title']}
            subtitle={common['projects.subtitle']}
          />
          <ProjectCreateDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            setAlert={setAlert}
            setDescription={setDescription}
            getProjectsList={getProjectsList}
          />
          <ProjectList projectsListData={projectsListData} />
        </>
      }
    />
  );
}

export default Project;
