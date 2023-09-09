import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Sidebar } from '@/layouts';
import Title from '@/components/Title';
import { TabList } from '@/pages/ProjectDetailUploadDataSource/components/TabList';
import { ingestDataUrlClientUsingPost } from '@/services/ProjectController';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import GithubIcon from '@/assets/icons/github.png';
import FileIcon from '@/assets/icons/file.png';
import YoutubeIcon from '@/assets/icons/youtube.png';
import WebsiteIcon from '@/assets/icons/website1.png';
import common from '@/config/common';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ingestDataInit: API.IngestDataClientUsingPostBody = {
  project_id: '',
  url: '',
  provider: 'github',
};

function ProjectDetailUploadDataSource() {
  const { toast } = useToast();

  const { projectId } = useParams<{ projectId: string | undefined }>();
  const [type, setType] = useState<string>('');
  const [ingestData, setIngestData] =
    useState<API.IngestDataClientUsingPostBody>({
      project_id: projectId,
      url: '',
      provider: 'github',
    });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngestData({ ...ingestData, url: e.target.value });
  };

  const codeDocsProviderInit = [
    {
      id: 1,
      name: 'Github',
      provider: 'github',
      icon: GithubIcon,
      selected: true,
      code: (
        <div className="space-y-2">
          <Label htmlFor="new">Enter your public GitHub URL:</Label>
          <Input
            id="new"
            type="url"
            placeholder="github.com/username/repo"
            onChange={onChangeInput}
          />
        </div>
      ),
    },
    {
      id: 2,
      name: 'Upload Files or Folder',
      provider: 'file',
      icon: FileIcon,
      selected: false,
      code: (
        <div className="flex flex-col gap-2">
          <Label htmlFor="new">Upload your Markdown, PDF or txt files:</Label>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline">Choose Files</Button>
            <Button variant="outline">Choose Folder</Button>
          </div>
        </div>
      ),
    },
  ];

  const websiteProviderInit = [
    {
      id: 1,
      name: 'Website',
      provider: 'website',
      icon: WebsiteIcon,
      selected: true,
      code: null,
    },
    {
      id: 2,
      name: 'Youtube',
      provider: 'youtube',
      icon: YoutubeIcon,
      selected: false,
      code: null,
    },
  ];

  const [codeDocsProvider, setCodeDocsProvider] =
    useState(codeDocsProviderInit);
  const [websiteProvider, setWebsiteProvider] = useState(websiteProviderInit);

  const onClickIngestData = async () => {
    try {
      console.log('ingestData:', ingestData);
      const res = await ingestDataUrlClientUsingPost(ingestData);
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
              websiteProvider={websiteProvider}
              setWebsiteProvider={setWebsiteProvider}
            />
          </div>
          <Toaster />
        </>
      }
    />
  );
}

export default ProjectDetailUploadDataSource;
