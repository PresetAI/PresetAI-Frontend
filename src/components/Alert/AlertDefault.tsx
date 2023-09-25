import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/auth_context';

type AlertDefaultProps = {
  description: string;
};

export function AlertDefault(props: AlertDefaultProps) {
  const { description } = props;

  const { setSuccessDescription } = useContext(AuthContext);

  // State to manage visibility of the alert
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // useEffect hook to hide the alert after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setSuccessDescription('');
    }, 4000); // 4000ms = 4s

    // Cleanup function to clear the timer if the component is unmounted before the timer finishes
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return isVisible ? (
    <Alert className="fixed top-10 right-10 w-80 z-[60] animate__animated animate__bounceInRight border-green-500  text-green-600">
      <CheckCircleOutlineOutlinedIcon
        style={{ color: 'rgb(22 163 74)', height: '1.25rem', width: '1.25rem' }}
      />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  ) : null;
}
