import { RefObject } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ProjectCreateDialogProps = {
  apiKeyNameValue: RefObject<HTMLInputElement>;
  dialogOpen: boolean;
  setDialogOpen: (dialogOpen: boolean) => void;
  onClickConfirmCreateAPIKey: (e: any) => void;
};

function CreateAPIKeyDialog(props: ProjectCreateDialogProps) {
  const {
    apiKeyNameValue,
    dialogOpen,
    setDialogOpen,
    onClickConfirmCreateAPIKey,
  } = props;

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
          <Button type="submit" onClick={onClickConfirmCreateAPIKey}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default CreateAPIKeyDialog;
