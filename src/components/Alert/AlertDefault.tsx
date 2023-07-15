import { Terminal, Waves } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AlertDefaultProps = {
  description: string;
};

export function AlertDefault(props: AlertDefaultProps) {
  const { description } = props;
  return (
    <Alert className="fixed top-10 right-10 w-80 z-[60] animate__animated animate__bounceInRight">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
