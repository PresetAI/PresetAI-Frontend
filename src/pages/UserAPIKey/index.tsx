import ProjectSidebar from '@/layouts/ProjectSidebar';
import APIKeyTable from '@/pages/UserAPIKey/components/APIKeyTable';
import { useEffect, useState } from 'react';
import AlertDestructive from '@/components/Alert/AlertDestructive';
import { AlertDefault } from '@/components/Alert/AlertDefault';
import { getAPIKeyUsingPost } from '@/services/UserController';
import CreateAPIKeyDialog from '@/pages/UserAPIKey/components/CreateAPIKeyDialog';

function UserAPIKey() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // dialog open or not
  const [alert, setAlert] = useState<null | 'default' | 'destructive'>(null);
  const [description, setDescription] = useState<string>('');
  const [projectsListData, setProjectsListData] = useState<API.Project[]>([]); // project list

  const [apiKeyData, setApiKeyData] = useState<API.UserAPIKey[]>([]); // API KEY LIST

  const getApiKeyList = async () => {
    const res = await getAPIKeyUsingPost();
    try {
      if (res.data.code === 200) {
        setApiKeyData(res.data.data);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    getApiKeyList();
  }, []);

  return (
    <ProjectSidebar
      component={
        <section className="pt-20 px-40">
          {alert === 'destructive' && (
            <AlertDestructive description={description} />
          )}
          {alert === 'default' && <AlertDefault description={description} />}
          <CreateAPIKeyDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            setAlert={setAlert}
            setDescription={setDescription}
            getApiKeyList={getApiKeyList}
          />
          <APIKeyTable apiKeyData={apiKeyData} setDialogOpen={setDialogOpen} />
        </section>
      }
      projectId="123"
    />
  );
}

export default UserAPIKey;
