import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from 'react-router-dom';

type ProcessProps = {
  projectId: string | undefined;
};

function Process(props: ProcessProps) {
  const { projectId } = props;
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Processing</CardTitle>
        <CardDescription>
          This may be take a few minutes, maybe longer!!!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link to={`/project/upload-history/${projectId}`}>
          <Button>Check Status</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
export default Process;
