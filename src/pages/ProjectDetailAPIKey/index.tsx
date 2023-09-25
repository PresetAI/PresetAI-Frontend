import { useContext, useEffect, useRef, useState } from 'react';

// Components
import { useParams } from 'react-router-dom';
import AlertConfirmDialog from '@/components/AlertConfirmDialog';
import Title from '@/components/Title';

// Configuration
import common from '@/config/common';

// Context
import { AuthContext } from '@/contexts/auth_context';

// Layout
import { Sidebar } from '@/layouts';

// Services
import {
  deleteAPIKeyByProjectIdAPIKeyIdUsingDelete,
  getAPIKeyListByProjectIdUsingGet,
  newAPIKeyByProjectIdUsingPost,
  updateAPIKeyByProjectIdAPIKeyIdUsingPut,
} from '@/services/ProjectController';

// Components (nested)
import CreateAPIKeyDialog from '@/pages/ProjectDetailAPIKey/components/CreateAPIKeyDialog';
import UpdateAPIKeyDialog from '@/pages/ProjectDetailAPIKey/components/UpdateAPIKeyDialog';
import APIKeyTable from '@/pages/ProjectDetailAPIKey/components/APIKeyTable';

// Initial state for creating a new API Key
const CreateAPIKeyBodyInit = {
  name: '',
  apikey_type: '',
};

/**
 * Component for managing API Keys within a project.
 */
function ProjectDetailAPIKey() {
  const { projectId } = useParams<{ projectId: string | undefined }>(); // Get project ID from the URL
  const { setFetchLoading, setSuccessDescription, setErrorDescription } =
    useContext(AuthContext);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // Indicates if the dialog is open or not
  const apiKeyNameValue = useRef<HTMLInputElement>(null);
  const [selectedId, setSelectedId] = useState<string>(''); // Stores the selected API Key ID

  const [createAPIKeyBody, setCreateAPIKeyBody] =
    useState<API.NewProjectAPIKeyUsingPostBody>(CreateAPIKeyBodyInit);

  // For update dialog
  const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false); // Indicates if the update dialog is open or not
  const [updateAPIKeyNameValue, setUpdateAPIKeyNameValue] = useState<
    string | undefined
  >('');

  // For alert confirm dialog
  const [alertConfirmDialogOpen, setAlertConfirmDialogOpen] =
    useState<boolean>(false); // Indicates if the alert confirm dialog is open or not
  const [alertConfirmDialogTitle, setAlertConfirmDialogTitle] =
    useState<string>(''); // Title for the alert confirm dialog
  const [alertConfirmDialogDescription, setAlertConfirmDialogDescription] =
    useState<string>(''); // Description for the alert confirm dialog

  const [apiKeyData, setApiKeyData] = useState<API.ProjectAPIKey[]>([]); // List of API Keys

  /**
   * Fetch the list of API Keys for the current project.
   */
  const getApiKeyList = async () => {
    setFetchLoading(true);
    const res = await getAPIKeyListByProjectIdUsingGet(projectId || '');
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
  /**
   * Handles the confirmation of creating a new API Key.
   */
  const onClickConfirmCreateAPIKey = async (e: any) => {
    e.preventDefault();
    if (createAPIKeyBody.name === '' || createAPIKeyBody.name === undefined) {
      setErrorDescription('Name cannot be empty');
      return;
    }
    if (
      createAPIKeyBody.apikey_type === '' ||
      createAPIKeyBody.apikey_type === undefined
    ) {
      setErrorDescription('Please select a type');
      return;
    }
    try {
      const res = await newAPIKeyByProjectIdUsingPost(
        createAPIKeyBody,
        projectId || ''
      );
      if (res.data.code === 200) {
        setCreateAPIKeyBody(CreateAPIKeyBodyInit);
        setSuccessDescription('API Key created successfully');
        setDialogOpen(false);
        await getApiKeyList();
      }
    } catch (error: any) {
      setErrorDescription(error.response.data.message);
    }
  };

  // For Update API Key
  /**
   * Opens the update API Key dialog.
   * @param id - The ID of the API Key to update.
   * @param value - The current value of the API Key name.
   */
  const onClickOpenUpdateAPIKeyDialog = (
    id: string,
    value: string | undefined
  ) => {
    setUpdateDialogOpen(true);
    setSelectedId(id);
    setUpdateAPIKeyNameValue(value);
  };

  /**
   * Handles the confirmation of updating an API Key.
   * @param e - The event object.
   */
  const onClickConfirmUpdateAPIKey = async (e: any) => {
    e.preventDefault();
    const apiKeyName = apiKeyNameValue.current?.value;
    if (!apiKeyName) {
      setErrorDescription('Name cannot be empty');
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
      setUpdateDialogOpen(false);
      apiKeyNameValue.current.value = ''; // Clear the input
      setSuccessDescription('API Key updated successfully');
      await getApiKeyList();
    }
  };

  // For Delete API Key
  /**
   * Opens the alert confirm dialog for deleting an API Key.
   * @param id - The ID of the API Key to delete.
   */
  const onClickOpenDeleteAPIKeyDialog = (id: string) => {
    setAlertConfirmDialogTitle('Delete API Key');
    setAlertConfirmDialogDescription(
      'Are you sure you want to delete this API Key?'
    );
    setAlertConfirmDialogOpen(true);
    setSelectedId(id);
  };

  /**
   * Handles the confirmation of deleting an API Key.
   */
  const onClickConfirmDeleteAPIKey = async () => {
    try {
      await deleteAPIKeyByProjectIdAPIKeyIdUsingDelete(
        projectId || '',
        selectedId
      );
      setUpdateDialogOpen(false);
      setSuccessDescription('API Key deleted successfully');
      await getApiKeyList();
    } catch (error: any) {
      setErrorDescription(error.response.data.message);
    }
  };

  useEffect(() => {
    getApiKeyList(); // Fetch the API Key list when the component mounts
  }, []);

  return (
    <Sidebar
      projectId={projectId}
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
            title={common['projectDetailAPIKey.title']}
            subtitle={common['projectDetailAPIKey.subtitle']}
          />
          <CreateAPIKeyDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            onClickConfirmCreateAPIKey={onClickConfirmCreateAPIKey}
            createAPIKeyBody={createAPIKeyBody}
            setCreateAPIKeyBody={setCreateAPIKeyBody}
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
