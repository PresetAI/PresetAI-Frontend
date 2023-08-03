import ProjectSidebar from '@/layouts/ProjectSidebar';
import APIKeyTable from '@/pages/UserAPIKey/components/APIKeyTable';
import { useEffect, useRef, useState } from 'react';
import AlertDestructive from '@/components/Alert/AlertDestructive';
import { AlertDefault } from '@/components/Alert/AlertDefault';
import {
  deleteAPIKeyUsingDelete,
  getAPIKeyUsingPost,
  newAPIKeyUsingPost,
  updateAPIKeyUsingPut,
} from '@/services/UserController';
import CreateAPIKeyDialog from '@/pages/UserAPIKey/components/CreateAPIKeyDialog';
import AlertConfirmDialog from '@/components/AlertConfirmDialog';
import UpdateAPIKeyDialog from '@/pages/UserAPIKey/components/UpdateAPIKeyDialog';

function UserAPIKey() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // dialog open or not
  const apiKeyNameValue = useRef<HTMLInputElement>(null);
  const [selectedId, setSelectedId] = useState<string | undefined>(''); // selected id

  // For update dialog
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false); // update dialog open or not
  const [updateAPIKeyNameValue, setUpdateAPIKeyNameValue] = useState<
    string | undefined
  >('');

  // For alert confirm dialog
  const [alertConfirmDialogOpen, setAlertConfirmDialogOpen] =
    useState<boolean>(false); // alert confirm dialog open or not
  const [alertConfirmDialogTitle, setAlertConfirmDialogTitle] =
    useState<string>(''); // alert confirm dialog title
  const [alertConfirmDialogDescription, setAlertConfirmDialogDescription] =
    useState<string>(''); // alert confirm dialog description

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

  // For Create API Key
  // confirm create API Key
  const onClickConfirmCreateAPIKey = async (e: any) => {
    e.preventDefault();
    const apiKeyName = apiKeyNameValue.current?.value;
    if (!apiKeyName) {
      setDescription('Name cannot be empty');
      setAlert('destructive');
      setTimeout(() => {
        setAlert(null);
      }, 5000);
      return;
    }
    try {
      const res = await newAPIKeyUsingPost(apiKeyName);
      if (res.data.code === 200) {
        setDescription('API Key create successfully');
        setAlert('default');
        setDialogOpen(false);
        apiKeyNameValue.current.value = ''; // clear the input
        setTimeout(() => {
          setAlert(null);
        }, 5000);
        getApiKeyList();
      }
    } catch (err: any) {
      setDescription(err.response.data.message);
      setAlert('destructive');
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  };

  // For Update API Key
  // open alert confirm dialog
  const onClickOpenUpdateAPIKeyDialog = (
    id: string | undefined,
    value: string | undefined
  ) => {
    setUpdateDialogOpen(true);
    setSelectedId(id);
    setUpdateAPIKeyNameValue(value);
  };
  // confirm update API Key
  const onClickConfirmUpdateAPIKey = async (e: any) => {
    e.preventDefault();
    const apiKeyName = apiKeyNameValue.current?.value;
    if (!apiKeyName) {
      setDescription('Name cannot be empty');
      setAlert('destructive');
      setTimeout(() => {
        setAlert(null);
      }, 5000);
      return;
    }
    const body: API.UpdateAPIKeyUsingPutBody = {
      api_key_id: selectedId || '',
      name: apiKeyNameValue.current?.value || '',
    };
    const res = await updateAPIKeyUsingPut(body);
    if (res.data.code === 200) {
      setDescription('API Key update successfully');
      setAlert('default');
      setUpdateDialogOpen(false);
      apiKeyNameValue.current.value = ''; // clear the input
      setTimeout(() => {
        setAlert(null);
      }, 5000);
      getApiKeyList();
    }
  };

  // For Delete API Key
  // open alert confirm dialog
  const onClickOpenDeleteAPIKeyDialog = (id: string | undefined) => {
    setAlertConfirmDialogTitle('Delete API Key');
    setAlertConfirmDialogDescription(
      'Are you sure you want to delete this API Key?'
    );
    setAlertConfirmDialogOpen(true);
    setSelectedId(id);
  };
  // confirm delete API Key
  const onClickConfirmDeleteAPIKey = async () => {
    try {
      await deleteAPIKeyUsingDelete(selectedId);
      setUpdateDialogOpen(false);
      getApiKeyList();
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
          {alertConfirmDialogOpen && (
            <AlertConfirmDialog
              dialogOpen={alertConfirmDialogOpen}
              setDialogOpen={setAlertConfirmDialogOpen}
              title={alertConfirmDialogTitle}
              description={alertConfirmDialogDescription}
              onClickConfirm={onClickConfirmDeleteAPIKey}
            />
          )}
          <CreateAPIKeyDialog
            apiKeyNameValue={apiKeyNameValue}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            onClickConfirmCreateAPIKey={onClickConfirmCreateAPIKey}
          />
          <UpdateAPIKeyDialog
            apiKeyNameValue={apiKeyNameValue}
            updateAPIKeyNameValue={updateAPIKeyNameValue}
            dialogOpen={updateDialogOpen}
            setDialogOpen={setUpdateDialogOpen}
            onClickConfirmUpdateAPIKey={onClickConfirmUpdateAPIKey}
          />
          <APIKeyTable
            apiKeyData={apiKeyData}
            setDialogOpen={setDialogOpen}
            onClickOpenDeleteAPIKeyDialog={onClickOpenDeleteAPIKeyDialog}
            onClickOpenUpdateAPIKeyDialog={onClickOpenUpdateAPIKeyDialog}
          />
        </section>
      }
      projectId="123"
    />
  );
}

export default UserAPIKey;
