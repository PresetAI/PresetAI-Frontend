import { Terminal, Waves } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

type AlertDefaultProps = {
  description: string;
};

export function AlertDefault(props: AlertDefaultProps) {
  const { description } = props;
  return (
    <Alert className="fixed top-10 right-10 w-80 z-[60] animate__animated animate__bounceInRight border-green-500  text-green-600">
      <CheckCircleOutlineOutlinedIcon
        style={{ color: 'rgb(22 163 74)', height: '1.25rem', width: '1.25rem' }}
      />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
