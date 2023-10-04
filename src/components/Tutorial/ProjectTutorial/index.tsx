import { Button as ButtonShadcn } from '@/components/ui/button';
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
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';
import create_project from '@/assets/gif/create_project.gif';
import create_user_apikey from '@/assets/gif/create_user_apikey.gif';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Create the project', 'Create a user API Key'];
const imagesStep = [create_project, create_user_apikey];

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function ProjectTutorial(props: Props) {
  const { open, setOpen } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Tutorial</DialogTitle>
          <DialogDescription>
            Follow the steps below to create a project and a user API key.
          </DialogDescription>
        </DialogHeader>
        <Box sx={{ width: '100%' }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                  {/*Step {activeStep + 1}*/}
                  <div className="border-2 border-primary rounded-2xl p-2">
                    <img
                      className="rounded-2xl"
                      src={imagesStep[activeStep]}
                      alt="step"
                    />
                  </div>
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <ButtonShadcn
                    variant="outline"
                    size="icon"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    <KeyboardArrowLeftOutlinedIcon className="h-4 w-4" />
                  </ButtonShadcn>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <ButtonShadcn
                    variant="outline"
                    size="icon"
                    onClick={handleNext}
                  >
                    <ChevronRightOutlinedIcon className="h-4 w-4" />
                  </ButtonShadcn>
                </Box>
              </React.Fragment>
            )}
          </div>
        </Box>

        {/*<DialogFooter>*/}
        {/*  <div>*/}
        {/*    {activeStep !== steps.length &&*/}
        {/*      (completed[activeStep] ? (*/}
        {/*        <Typography variant="caption" sx={{ display: 'inline-block' }}>*/}
        {/*          Step {activeStep + 1} already completed*/}
        {/*        </Typography>*/}
        {/*      ) : (*/}
        {/*        <Button onClick={handleComplete}>*/}
        {/*          {completedSteps() === totalSteps() - 1*/}
        {/*            ? 'Finish'*/}
        {/*            : 'Complete Step'}*/}
        {/*        </Button>*/}
        {/*      ))}*/}
        {/*  </div>*/}
        {/*  <Button type="submit">Save changes</Button>*/}
        {/*</DialogFooter>*/}
      </DialogContent>
    </Dialog>
  );
}
