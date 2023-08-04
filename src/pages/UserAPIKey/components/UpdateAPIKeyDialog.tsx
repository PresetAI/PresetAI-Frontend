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

type UpdateAPIKeyDialogProps = {
  apiKeyNameValue: RefObject<HTMLInputElement>;
  updateAPIKeyNameValue: string | undefined;
  dialogOpen: boolean;
  setDialogOpen: (dialogOpen: boolean) => void;
  onClickConfirmUpdateAPIKey: (e: any) => void;
};

function UpdateAPIKeyDialog(props: UpdateAPIKeyDialogProps) {
  const {
    apiKeyNameValue,
    updateAPIKeyNameValue,
    dialogOpen,
    setDialogOpen,
    onClickConfirmUpdateAPIKey,
  } = props;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Update API Key</DialogTitle>
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
              defaultValue={updateAPIKeyNameValue}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={onClickConfirmUpdateAPIKey}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default UpdateAPIKeyDialog;
