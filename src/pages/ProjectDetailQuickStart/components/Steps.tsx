import { CheckIcon } from '@heroicons/react/20/solid';
import { useContext, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { IngestContext } from '@/contexts/ingest_context';
import {
  getProjectByProjectIdUsingGet,
  getProjectFileByProjectIdUsingGet,
  getTasksUsingGet,
} from '@/services/ProjectController';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
type StepComponentProps = {
  step: any;
  stepIdx: number;
  stepsLength: number;
};

function StepComponent({ step, stepIdx, stepsLength }: StepComponentProps) {
  const renderStepLine = () => {
    if (stepIdx === stepsLength - 1) return null;

    const bgColor =
      step.status === 'complete' ? 'bg-indigo-600' : 'bg-gray-300';
    return (
      <div
        className={`absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 ${bgColor}`}
        aria-hidden="true"
      />
    );
  };

  const renderStepIcon = () => {
    switch (step.status) {
      case 'complete':
        return (
          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
            <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
        );
      case 'current':
        return (
          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
          </span>
        );
      default:
        return (
          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
            <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
          </span>
        );
    }
  };

  return (
    <li
      className={classNames(
        stepIdx !== stepsLength - 1 ? 'pb-10' : '',
        'relative'
      )}
    >
      {renderStepLine()}
      <Link
        to={step.href}
        className="group relative flex items-start"
        aria-current={step.status === 'current' ? 'step' : undefined}
      >
        <span className="flex h-9 items-center" aria-hidden="true">
          {renderStepIcon()}
        </span>
        <span className="ml-4 flex min-w-0 flex-col">
          <span
            className={`text-sm font-medium ${
              step.status === 'complete' || step.status === 'current'
                ? 'text-indigo-600'
                : 'text-gray-500'
            }`}
          >
            {step.name}
          </span>
          <span className="text-sm text-gray-500">{step.description}</span>
        </span>
      </Link>
    </li>
  );
}

type StepsProps = {
  projectId: string | undefined;
};

export default function Steps(props: StepsProps) {
  const { projectId } = props;
  const initialSteps = [
    {
      id: 'create-project',
      name: 'Create project',
      description: 'Setup the project.',
      href: '/projects',
      status: 'complete',
    },
    {
      id: 'add-data-source',
      name: 'Add Data Sources',
      description:
        "Navigate to 'Add Data Sources', and choose the data source you want to upload.",
      href: `/project/upload-data-source/${projectId}`,
      status: 'upcoming',
    },
    {
      id: 'check-status',
      name: 'Check Status',
      description:
        "Navigate to 'Upload History' to check the status of your data source.",
      href: `/project/upload-history/${projectId}`,
      status: 'upcoming',
    },
    {
      id: 'check-files',
      name: 'Check Files',
      description:
        "Navigate to 'Data Sources' to view all your data sources. You can also delete the data source from here.",
      href: `/project/file-management/${projectId}`,
      status: 'upcoming',
    },
    {
      id: 'start-to-chat',
      name: 'Start to Chat',
      description:
        "Navigate to 'Playground' to start asking question for your data source.",
      href: `/project/playground/${projectId}`,
      status: 'upcoming',
    },
    {
      id: 'embed-your-component',
      name: 'Embed Your Component',
      description: 'Deploy Chatbot in your website.',
      href: '#',
      status: 'upcoming',
    },
  ];
  const [steps, setSteps] = useState<any[]>(() => {
    // Try to get the steps from localStorage
    const savedSteps = localStorage.getItem(`steps-${projectId}`);
    // If steps are found in localStorage, parse them and return
    if (savedSteps) return JSON.parse(savedSteps);
    // If not, return the initial steps
    return initialSteps;
  });

  useEffect(() => {
    if (!localStorage.getItem(`steps-${projectId}`)) {
      localStorage.setItem(`steps-${projectId}`, JSON.stringify(initialSteps));
    }
  }, [initialSteps]);

  useEffect(() => {
    const checkSteps = async () => {
      for (const step of steps) {
        if (step.status === 'upcoming') {
          if (step.id === 'add-data-source') {
            const res = await getTasksUsingGet(projectId);
            if (res.data.code === 200 && res.data.data.length > 0) {
              step.status = 'complete';
            }
          } else if (step.id === 'check-status') {
            const res = await getTasksUsingGet(projectId);
            if (res.data.code === 200 && res.data.data.length > 0) {
              step.status = 'complete';
            }
          } else if (step.id === 'check-files') {
            // Your logic here
            const res = await getProjectFileByProjectIdUsingGet(projectId);
            if (res.data.code === 200 && res.data.data.length > 0) {
              step.status = 'complete';
            }
          } else if (step.id === 'start-to-chat') {
            // Your logic here
          } else if (step.id === 'embed-your-component') {
            // Your logic here
          }
          localStorage.setItem(`steps-${projectId}`, JSON.stringify(steps));
          // update the steps in state
          setSteps(steps);
          return;
        }
      }
    };

    checkSteps();
  }, [steps]);

  return (
    <Card className="p-4 col-span-1">
      <nav aria-label="Progress">
        <ol role="list" className="overflow-hidden">
          {steps.map((step, stepIdx) => (
            <StepComponent
              key={step.id}
              step={step}
              stepIdx={stepIdx}
              stepsLength={steps.length}
            />
          ))}
        </ol>
      </nav>
    </Card>
  );
}
