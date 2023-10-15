import React, { useContext, useEffect, useState } from 'react';

// Components
import ProjectList from './components/ProjectList';
import ProjectCreateDialog from '@/pages/Project/components/ProjectCreateDialog';
import Title from '@/components/Title';

// Services
import { getProjectsUsingGet } from '@/services/ProjectController';

// Layouts
import ProjectSidebar from '@/layouts/ProjectSidebar';

// Configuration
import common from '@/config/common';

// Context
import { AuthContext } from '@/contexts/auth_context';

// Components (nested)
import Loader from '@/components/Loader';

function Project() {
  const {
    setFetchLoading,
    localization,
    fetchProcessLoading,
    setErrorDescription,
  } = useContext(AuthContext);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // Indicates if the dialog is open or not
  const [projectsListData, setProjectsListData] = useState<API.Project[]>([]); // List of projects

  const getProjectsList = async () => {
    setFetchLoading(true);
    const res = await getProjectsUsingGet();
    try {
      if (res.data.code === 200) {
        setProjectsListData(res.data.data);
      }
    } catch (error: any) {
      setErrorDescription(error.response.data.message);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    getProjectsList(); // Fetch the list of projects when the component mounts
  }, []);

  return (
    <ProjectSidebar
      component={
        <>
          <Loader open={fetchProcessLoading} title={localization} />
          <Title
            title={common['projects.title']}
            subtitle={common['projects.subtitle']}
          />
          <ProjectCreateDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            getProjectsList={getProjectsList}
          />
          <ProjectList projectsListData={projectsListData} />
        </>
      }
    />
  );
}

export default Project;
