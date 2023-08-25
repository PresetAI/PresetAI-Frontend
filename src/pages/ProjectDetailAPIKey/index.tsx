import { useContext, useEffect, useRef, useState } from 'react';
import AlertDestructive from '@/components/Alert/AlertDestructive';
import { AlertDefault } from '@/components/Alert/AlertDefault';
import { newAPIKeyUsingPost } from '@/services/UserController';
import AlertConfirmDialog from '@/components/AlertConfirmDialog';
import Title from '@/components/Title';
import common from '@/config/common';
import { AuthContext } from '@/contexts/auth_context';
import { useParams } from 'react-router-dom';
import { Sidebar } from '@/layouts';
import {
  deleteAPIKeyByProjectIdAPIKeyIdUsingDelete,
  getAPIKeyListByProjectIdUsingGet,
  updateAPIKeyByProjectIdAPIKeyIdUsingPut,
} from '@/services/ProjectController';
import CreateAPIKeyDialog from '@/pages/ProjectDetailAPIKey/components/CreateAPIKeyDialog';
import UpdateAPIKeyDialog from '@/pages/ProjectDetailAPIKey/components/UpdateAPIKeyDialog';
import APIKeyTable from '@/pages/ProjectDetailAPIKey/components/APIKeyTable';

function ProjectDetailAPIKey() {
  const { projectId } = useParams<{ projectId: string | undefined }>(); // get params from url
  const { setFetchLoading } = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // dialog open or not
  const apiKeyNameValue = useRef<HTMLInputElement>(null);
  const [selectedId, setSelectedId] = useState<string>(''); // selected id

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

  const [apiKeyData, setApiKeyData] = useState<API.ProjectAPIKey[]>([]); // API KEY LIST

  const getApiKeyList = async () => {
    setFetchLoading(true);
    const res = await getAPIKeyListByProjectIdUsingGet(projectId || '');
    try {
      if (res.data.code === 200) {
        setApiKeyData(res.data.data);
      }
    } catch (e: any) {
      console.log(e);
    }
    setFetchLoading(false);
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
      const body: API.NewAPIKeyUsingPostBody = {
        name: apiKeyName,
      };
      const res = await newAPIKeyUsingPost(body);
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
    id: string,
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
    const body: API.UpdateAPIKeyByProjectIdAPIKeyIdUsingPutBody = {
      name: apiKeyNameValue.current?.value || '',
    };
    const res = await updateAPIKeyByProjectIdAPIKeyIdUsingPut(
      body,
      projectId || '',
      selectedId
    );
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
  const onClickOpenDeleteAPIKeyDialog = (id: string) => {
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
      await deleteAPIKeyByProjectIdAPIKeyIdUsingDelete(
        projectId || '',
        selectedId
      );
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
    <Sidebar
      projectId={projectId}
      component={
        <>
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
          <Title
            title={common['projectDetailAPIKey.title']}
            subtitle={common['projectDetailAPIKey.subtitle']}
          />
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
        </>
      }
    />
  );
}

export default ProjectDetailAPIKey;
