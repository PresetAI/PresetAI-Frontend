import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Sidebar } from '@/layouts';
import Title from '@/components/Title';
import { TabList } from '@/pages/ProjectDetailUploadDataSource/components/TabList';
import { ingestDataClientUsingPost } from '@/services/ProjectController';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import GithubIcon from '@/assets/icons/github.png';

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
      const res = await ingestDataClientUsingPost(ingestData);
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
        // <section className="grid grid-cols-2 gap-20">
        // <section className="grid grid-cols-1 sm:grid-cols-9 justify-items-start place-items-start mx-auto px-8 sm:px-12 lg:px-16">
        <section className="h-[100vh] pt-10 px-10">
          <Title title="Upload Data Source" />
          <div className="flex justify-center">
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
        </section>
      }
    />
  );
}

export default ProjectDetailUploadDataSource;
