import ProjectList from './components/ProjectList';
import ProjectCreateDialog from '@/pages/Project/components/ProjectCreateDialog';
import { useEffect, useState } from 'react';
import AlertDestructive from '@/components/Alert/AlertDestructive';
import { AlertDefault } from '@/components/Alert/AlertDefault';
import { getProjectsUsingGet } from '@/services/ProjectController';
import ProjectSidebar from '@/layouts/ProjectSidebar';

function Project() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // dialog open or not
  const [alert, setAlert] = useState<null | 'default' | 'destructive'>(null);
  const [description, setDescription] = useState<string>('');
  const [projectsListData, setProjectsListData] = useState<API.Project[]>([]); // project list

  const getProjectsList = async () => {
    const res = await getProjectsUsingGet();
    try {
      if (res.data.code === 200) {
        setProjectsListData(res.data.data);
      }
    } catch (e: any) {
      console.log(e);
    }
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
      projectId="123"
    />
  );
}

export default Project;
