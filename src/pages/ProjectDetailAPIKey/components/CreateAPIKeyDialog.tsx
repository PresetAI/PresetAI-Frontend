import { RefObject } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ProjectCreateDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: (dialogOpen: boolean) => void;
  onClickConfirmCreateAPIKey: (e: any) => void;
  createAPIKeyBody: API.NewProjectAPIKeyUsingPostBody;
  setCreateAPIKeyBody: (
    createAPIKeyBody: API.NewProjectAPIKeyUsingPostBody
  ) => void;
};

function CreateAPIKeyDialog(props: ProjectCreateDialogProps) {
  const {
    dialogOpen,
    setDialogOpen,
    onClickConfirmCreateAPIKey,
    createAPIKeyBody,
    setCreateAPIKeyBody,
  } = props;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button
            className="text-sm font-semibold mt-4"
            onClick={() => setDialogOpen(true)}
          >
            Create New Secret Key
          </Button>
        </DialogTrigger>
      </div>
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
              onChange={(e) => {
                setCreateAPIKeyBody({
                  ...createAPIKeyBody,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select
              onValueChange={(value) => {
                setCreateAPIKeyBody({
                  ...createAPIKeyBody,
                  apikey_type: value,
                });
              }}
            >
              <SelectTrigger className="col-span-4">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent className="col-span-4">
                <SelectGroup>
                  <SelectLabel>API Key type</SelectLabel>
                  <SelectItem value="Client-side">Client-side</SelectItem>
                  <SelectItem value="Server-side">Server-side</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={onClickConfirmCreateAPIKey}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default CreateAPIKeyDialog;
