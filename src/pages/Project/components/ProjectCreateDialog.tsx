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

type ProjectCreateDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: (dialogOpen: boolean) => void;
  setAlert: (alert: null | 'default' | 'destructive') => void;
  setDescription: (description: string) => void;
  getProjectsList: () => void;
};

function ProjectCreateDialog(props: ProjectCreateDialogProps) {
  const {
    dialogOpen,
    setDialogOpen,
    setAlert,
    setDescription,
    getProjectsList,
  } = props;
  // useref to get the input value
  const projectNameRef = useRef<HTMLInputElement>(null);
  const [projectForm, setProjectForm] = useState<API.NewProjectUsingPostBody>();

  const createProject = async (e: any) => {
    e.preventDefault();
    const projectName = projectNameRef.current?.value;
    if (!projectName) {
      setDescription('Project name is required');
      setAlert('destructive');
      setTimeout(() => {
        setAlert(null);
      }, 5000);
      return;
    }
    // setProjectForm();
    try {
      const body: API.NewProjectUsingPostBody = {
        project_name: projectName,
      };
      const res = await newProjectUsingPost(body);
      if (res.data.code === 200) {
        setDescription('Project create successfully');
        setAlert('default');
        setDialogOpen(false);
        projectNameRef.current.value = ''; // clear the input
        setTimeout(() => {
          setAlert(null);
        }, 5000);
        getProjectsList();
      }
    } catch (err: any) {
      setDescription(err.response.data.message);
      setAlert('destructive');
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => setDialogOpen(true)}>
            Create the Project
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Project Name
            </Label>
            <Input
              id="name"
              placeholder="e.g presetai"
              className="col-span-3"
              ref={projectNameRef}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={createProject}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ProjectCreateDialog;
