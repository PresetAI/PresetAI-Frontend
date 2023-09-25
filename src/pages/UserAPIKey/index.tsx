// Import React and necessary hooks and components
import { useContext, useEffect, useRef, useState } from 'react';
import {
  deleteAPIKeyUsingDelete,
  getAPIKeyUsingPost,
  newAPIKeyUsingPost,
  updateAPIKeyUsingPut,
} from '@/services/UserController';
import CreateAPIKeyDialog from '@/pages/UserAPIKey/components/CreateAPIKeyDialog';
import AlertConfirmDialog from '@/components/AlertConfirmDialog';
import UpdateAPIKeyDialog from '@/pages/UserAPIKey/components/UpdateAPIKeyDialog';
import Title from '@/components/Title';
import common from '@/config/common';
import { AuthContext } from '@/contexts/auth_context';

// Import necessary components and layouts
import ProjectSidebar from '@/layouts/ProjectSidebar';
import APIKeyTable from '@/pages/UserAPIKey/components/APIKeyTable';
import localization from '@/config/localization';

// Define the UserAPIKey component
function UserAPIKey() {
  const {
    setFetchLoading,
    setSuccessDescription,
    setErrorDescription,
    setLocalizationAndLoadingFunction,
  } = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // Indicates if the dialog is open
  const apiKeyNameValue = useRef<HTMLInputElement>(null);
  const [selectedId, setSelectedId] = useState<string>(''); // Stores the selected ID

  // For update dialog
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false); // Indicates if the update dialog is open
  const [updateAPIKeyNameValue, setUpdateAPIKeyNameValue] = useState<
    string | undefined
  >('');

  // For alert confirm dialog
  const [alertConfirmDialogOpen, setAlertConfirmDialogOpen] =
    useState<boolean>(false); // Indicates if the alert confirm dialog is open
  const [alertConfirmDialogTitle, setAlertConfirmDialogTitle] =
    useState<string>(''); // Title of the alert confirm dialog
  const [alertConfirmDialogDescription, setAlertConfirmDialogDescription] =
    useState<string>(''); // Description of the alert confirm dialog

  const [apiKeyData, setApiKeyData] = useState<API.UserAPIKey[]>([]); // List of API keys

  // Function to fetch the list of API keys
  const getApiKeyList = async () => {
    setFetchLoading(true);
    const res = await getAPIKeyUsingPost();
    try {
      if (res.data.code === 200) {
        setApiKeyData(res.data.data);
      }
    } catch (error: any) {
      setErrorDescription(error.response.data.message);
    } finally {
      setFetchLoading(false);
    }
  };

  // For Create API Key
  // Function to confirm creation of API Key
  const onClickConfirmCreateAPIKey = async (e: any) => {
    e.preventDefault();
    const apiKeyName = apiKeyNameValue.current?.value;
    if (!apiKeyName) {
      setErrorDescription('Name cannot be empty');
      return;
    }
    try {
      setLocalizationAndLoadingFunction(localization.creating, true);
      const body: API.NewAPIKeyUsingPostBody = {
        name: apiKeyName,
      };
      const res = await newAPIKeyUsingPost(body);
      if (res.data.code === 200) {
        setLocalizationAndLoadingFunction(localization.empty, false);
        setDialogOpen(false);
        setSuccessDescription('API Key created successfully');
        apiKeyNameValue.current.value = ''; // Clear the input
        await getApiKeyList();
      }
    } catch (err: any) {
      setLocalizationAndLoadingFunction(localization.empty, false);
      setErrorDescription(err.response.data.message);
    }
  };

  // For Update API Key
  // Function to open the alert confirm dialog for updating API Key
  const onClickOpenUpdateAPIKeyDialog = (
    id: string,
    value: string | undefined
  ) => {
    setUpdateDialogOpen(true);
    setSelectedId(id);
    setUpdateAPIKeyNameValue(value);
  };

  // Function to confirm the update of API Key
  const onClickConfirmUpdateAPIKey = async (e: any) => {
    e.preventDefault();
    const apiKeyName = apiKeyNameValue.current?.value;
    if (!apiKeyName) {
      setErrorDescription('Name cannot be empty');
      return;
    }
    const body: API.UpdateAPIKeyUsingPutBody = {
      name: apiKeyNameValue.current?.value || '',
    };
    const res = await updateAPIKeyUsingPut(selectedId, body);
    if (res.data.code === 200) {
      setUpdateDialogOpen(false);
      apiKeyNameValue.current.value = ''; // Clear the input
      setSuccessDescription('API Key updated successfully');
      await getApiKeyList();
    }
  };

  // For Delete API Key
  // Function to open the alert confirm dialog for deleting API Key
  const onClickOpenDeleteAPIKeyDialog = (id: string) => {
    setAlertConfirmDialogTitle('Delete API Key');
    setAlertConfirmDialogDescription(
      'Are you sure you want to delete this API Key?'
    );
    setAlertConfirmDialogOpen(true);
    setSelectedId(id);
  };

  // Function to confirm the deletion of API Key
  const onClickConfirmDeleteAPIKey = async () => {
    try {
      await deleteAPIKeyUsingDelete(selectedId);
      setUpdateDialogOpen(false);
      setSuccessDescription('API Key deleted successfully');
      await getApiKeyList();
    } catch (error: any) {
      setErrorDescription(error.response.data.message);
    }
  };

  useEffect(() => {
    getApiKeyList();
  }, []);

  return (
    <ProjectSidebar
      component={
        <>
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
            title={common['userAPIKeys.title']}
            subtitle={common['userAPIKeys.subtitle']}
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

export default UserAPIKey;
