import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AlertDestructiveProps = {
  description: string;
};

function AlertDestructive(props: AlertDestructiveProps) {
  const { description } = props;
  return (
    <Alert
      variant="destructive"
      className="fixed top-10 right-10 w-80 z-[60] animate__animated animate__bounceInRight"
    >
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

export default AlertDestructive;
