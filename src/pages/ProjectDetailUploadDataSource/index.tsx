import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Sidebar } from '@/layouts';
import Title from '@/components/Title';
import { TabList } from '@/pages/ProjectDetailUploadDataSource/components/TabList';
import { ingestDataClientUsingPost } from '@/services/ProjectController';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import GithubIcon from '@/assets/icons/github.png';
import common from '@/config/common';

const ingestDataInit: API.IngestDataClientUsingPostBody = {
  project_id: '',
  provider: '',
  url: '',
};

const codeDocsProviderInit = [
  {
    id: 1,
    name: 'Github',
    provider: 'github',
    icon: GithubIcon,
    selected: false,
  },
  {
    id: 2,
    name: 'Upload Files or Folder',
    provider: 'file',
    icon: GithubIcon,
    selected: false,
  },
];

function ProjectDetailUploadDataSource() {
  const { toast } = useToast();

  const { projectId } = useParams<{ projectId: string | undefined }>();
  const [type, setType] = useState<string>('');
  const [ingestData, setIngestData] =
    useState<API.IngestDataClientUsingPostBody>(ingestDataInit);
  const [codeDocsProvider, setCodeDocsProvider] =
    useState(codeDocsProviderInit);

  const onClickIngestData = async () => {
    try {
      // const res = await ingestDataClientUsingPost(ingestData);
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: e.response.data.message,
      });
    }
  };

  useEffect(() => {
    setIngestData({ ...ingestData, project_id: projectId || '' });
  }, []);

  return (
    <Sidebar
      projectId={projectId}
      component={
        <>
          <Title
            title={common['projectDetailUploadDataSource.title']}
            subtitle={common['projectDetailUploadDataSource.subtitle']}
          />
          <div className="flex justify-center py-4">
            <TabList
              setType={setType}
              ingestData={ingestData}
              setIngestData={setIngestData}
              onClickIngestData={onClickIngestData}
              codeDocsProvider={codeDocsProvider}
              setCodeDocsProvider={setCodeDocsProvider}
            />
          </div>
          <Toaster />
        </>
      }
    />
  );
}

export default ProjectDetailUploadDataSource;
