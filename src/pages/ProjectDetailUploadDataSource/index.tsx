import { useParams, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
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
import Process from '@/pages/ProjectDetailUploadDataSource/components/Process';
import { IngestContext } from '@/contexts/ingest_context';

function ProjectDetailUploadDataSource() {
  const { processing } = useContext(IngestContext);
  const { projectId } = useParams<{ projectId: string | undefined }>();
  // const onChangeGithubProviderInput = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setIngestData({ ...ingestData, url: e.target.value });
  // };

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
            {processing ? (
              <Process projectId={projectId} />
            ) : (
              <TabList projectId={projectId} />
            )}
          </div>
          <Toaster />
        </>
      }
    />
  );
}

export default ProjectDetailUploadDataSource;
