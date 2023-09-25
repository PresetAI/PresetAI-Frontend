import React, { useContext, useRef } from 'react';
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
// Services
import { newProjectUsingPost } from '@/services/ProjectController';

// Localization
import localization from '@/config/localization';

// Context
import { AuthContext } from '@/contexts/auth_context';

// Props type for ProjectCreateDialog
type ProjectCreateDialogProps = {
  // Indicates if the dialog is open
  dialogOpen: boolean;
  // Function to control the dialog's open state
  setDialogOpen: (dialogOpen: boolean) => void;
  // Function to fetch the list of projects
  getProjectsList: () => void;
};

function ProjectCreateDialog(props: ProjectCreateDialogProps) {
  const { dialogOpen, setDialogOpen, getProjectsList } = props;

  const {
    setSuccessDescription,
    setErrorDescription,
    setLocalizationAndLoadingFunction,
  } = useContext(AuthContext);

  // useRef to get the input value
  const projectNameRef = useRef<HTMLInputElement>(null);

  // Function to create a new project
  /**
   * @param {Event} e - The event object.
   */
  const createProject = async (e: any) => {
    e.preventDefault();
    const projectName = projectNameRef.current?.value;

    if (!projectName) {
      setErrorDescription('Project name is required');
      return;
    }

    try {
      setLocalizationAndLoadingFunction(localization.creating, true);
      const body: API.NewProjectUsingPostBody = {
        project_name: projectName,
      };
      const res = await newProjectUsingPost(body);

      if (res.data.code === 200) {
        setLocalizationAndLoadingFunction(localization.empty, false);
        setSuccessDescription('Project created successfully');
        setDialogOpen(false);
        projectNameRef.current.value = ''; // Clear the input
        getProjectsList();
      }
    } catch (err: any) {
      setLocalizationAndLoadingFunction(localization.empty, false);
      setErrorDescription(err.response.data.message);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="flex justify-end">
        <DialogTrigger asChild>
          <Button
            className="text-sm font-semibold mt-4"
            onClick={() => setDialogOpen(true)}
          >
            Create the Project
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Create a new project for your team
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Project Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. presetai"
              className="col-span-3"
              ref={projectNameRef}
            />
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
