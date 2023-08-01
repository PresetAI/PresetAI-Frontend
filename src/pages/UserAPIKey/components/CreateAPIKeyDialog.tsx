import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRef, useState } from 'react';
import { newProjectUsingPost } from '@/services/ProjectController';
import { newAPIKeyUsingPost } from '@/services/UserController';

type ProjectCreateDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: (dialogOpen: boolean) => void;
  setAlert: (alert: null | 'default' | 'destructive') => void;
  setDescription: (description: string) => void;
  getApiKeyList: () => void;
};

function CreateAPIKeyDialog(props: ProjectCreateDialogProps) {
  const { dialogOpen, setDialogOpen, setAlert, setDescription, getApiKeyList } =
    props;
  // useref to get the input value
  const apiKeyNameValue = useRef<HTMLInputElement>(null);

  const createApiKey = async (e: any) => {
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
      console.log(err.response);
      setDescription(err.response.data.message);
      setAlert('destructive');
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Create new API Key</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="My Test Key"
              className="col-span-4"
              ref={apiKeyNameValue}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={createApiKey}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default CreateAPIKeyDialog;
