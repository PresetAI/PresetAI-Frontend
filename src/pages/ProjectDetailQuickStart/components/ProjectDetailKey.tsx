import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import IconButton from '@mui/material/IconButton';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { AlertDefault } from '@/components/Alert/AlertDefault';
import { getAPIKeyListByProjectIdUsingGet } from '@/services/ProjectController';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type ProjectDetailKeyProps = {
  projectId: string | undefined;
};

export default function ProjectDetailKey(props: ProjectDetailKeyProps) {
  const { projectId } = props;
  const [copyToClipboard, { success }] = useCopyToClipboard();
  const [clientSideKey, setClientSideKey] = useState<string>('');
  const [serverSideKey, setServerSideKey] = useState<string>('');
  const getApiKeyList = async () => {
    const res = await getAPIKeyListByProjectIdUsingGet(projectId || '');
    if (res.data.code === 200) {
      res.data.data.forEach((item: API.ProjectAPIKey) => {
        // get the first client-side key
        if (item.type === 'Client-side' && clientSideKey === '') {
          setClientSideKey(item.api_key);
        }
        // get the first server-side key
        if (item.type === 'Server-side' && serverSideKey === '') {
          setServerSideKey(item.api_key);
        }
      });
    }
  };
  useEffect(() => {
    getApiKeyList();
  }, []);

  return (
    <>
      {success ? (
        <AlertDefault description="API Key copied to clipboard!" />
      ) : null}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Your project keys</CardTitle>
          <div>
            <div className="mt-4">
              <h4 className="text-primary font-semibold">Client-side key</h4>
              {clientSideKey === '' ? (
                <Link to={`/project/api-keys/${projectId}`}>
                  <Button className="bg-indigo-600 text-white hover:bg-indigo-800">
                    Create One
                  </Button>
                </Link>
              ) : (
                <div
                  className="bg-indigo-600 text-white font-normal inline-flex items-center rounded-[6px] px-1 cursor-pointer hover:bg-indigo-800 transition duration-150 tracking-wider my-0.5"
                  onClick={() => copyToClipboard(clientSideKey)}
                >
                  {clientSideKey}
                  <IconButton aria-label="visibility eye" size="small">
                    <div className="text-primary-foreground">
                      <ContentCopyRoundedIcon sx={{ width: 16, height: 16 }} />
                    </div>
                  </IconButton>
                </div>
              )}
              <p className="text-muted-foreground text-sm">
                Client-side key is used for client-side components.
              </p>
            </div>
            <div className="mt-2">
              <h4 className="text-primary font-semibold">Server-side key</h4>
              {serverSideKey === '' ? (
                <Link to={`/project/api-keys/${projectId}`}>
                  <Button className="bg-indigo-600 text-white hover:bg-indigo-800">
                    Create One
                  </Button>
                </Link>
              ) : (
                <div
                  className="bg-indigo-600 text-white font-normal inline-flex items-center rounded-[6px] px-1 cursor-pointer hover:bg-indigo-800 transition duration-150 tracking-wider my-0.5"
                  onClick={() => copyToClipboard(serverSideKey)}
                >
                  {serverSideKey}
                  <IconButton aria-label="visibility eye" size="small">
                    <div className="text-white">
                      <ContentCopyRoundedIcon sx={{ width: 16, height: 16 }} />
                    </div>
                  </IconButton>
                </div>
              )}
              <p className="text-muted-foreground text-sm">
                Server-side key is used for api call.
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}
