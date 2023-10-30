import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUserUsingGet } from '../services/UserController';
import { BASE_URL } from '@/config/domain';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  getTasksUsingGet,
  ingestDataFileClientUsingPost,
  ingestDataUrlClientUsingPost,
} from '@/services/ProjectController';
import { useToast } from '@/components/ui/use-toast';
import { AuthContext } from '@/contexts/auth_context';

type IngestContextProviderProps = {
  children: React.ReactNode;
};

type IngestContextType = {
  activeProvider: string;
  ingestDataFiles: File[] | null;
  processing: boolean;
  setGithubInput: React.Dispatch<React.SetStateAction<string>>;
  setYoutubeInput: React.Dispatch<React.SetStateAction<string>>;
  onClickProvider: (name: string) => void;
  handleFilesProviderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickFetchIngestData: (projectId: string | undefined) => void;
};

const IngestContext = createContext<IngestContextType>({
  activeProvider: '',
  ingestDataFiles: null,
  processing: false,
  setGithubInput: () => {},
  setYoutubeInput: () => {},
  onClickProvider: () => {},
  handleFilesProviderChange: () => {},
  onClickFetchIngestData: () => {},
});

function IngestProvider({ children }: IngestContextProviderProps) {
  const { toast } = useToast();
  const [githubInput, setGithubInput] = useState<string>('');
  const [youtubeInput, setYoutubeInput] = useState<string>('');
  const [ingestDataFiles, setIngestDataFiles] = useState<File[] | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [activeProviderParams, setActiveProviderParams] = useSearchParams({
    provider: '',
  });
  const activeProvider = activeProviderParams.get('provider') || 'github';

  const onClickProvider = (name: string) => {
    setActiveProviderParams(
      (prev: any) => {
        prev.set('provider', name);
        return prev;
      },
      { replace: true }
    );
  };

  const handleFilesProviderChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const filesArray = Array.from(e.target.files || []);
    setIngestDataFiles(filesArray);
  };

  const onClickFetchIngestData = async (projectId: string | undefined) => {
    try {
      setProcessing(true);
      if (activeProvider === 'github') {
        const ingestData: API.IngestDataClientUsingPostBody = {
          project_id: projectId,
          url: githubInput,
          provider: 'github',
        };
        await ingestDataUrlClientUsingPost(ingestData);
      } else if (activeProvider === 'files') {
        const formData = new FormData();
        formData.append('project_id', projectId || '');
        formData.append('provider', 'files');
        if (ingestDataFiles) {
          ingestDataFiles.forEach((file) => {
            formData.append('files', file);
          });
        }
        await ingestDataFileClientUsingPost(formData);
      } else if (activeProvider === 'youtube') {
        const ingestData: API.IngestDataClientUsingPostBody = {
          project_id: projectId,
          url: youtubeInput,
          provider: 'youtube',
        };
        await ingestDataUrlClientUsingPost(ingestData);
      } else if (activeProvider === 'table') {
        const formData = new FormData();
        formData.append('project_id', projectId || '');
        formData.append('provider', 'table');
        if (ingestDataFiles) {
          ingestDataFiles.forEach((file) => {
            formData.append('files', file);
          });
        }
        await ingestDataFileClientUsingPost(formData);
      }
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: e.response.data.message,
      });
    } finally {
      setIngestDataFiles(null);
      setProcessing(false);
    }
  };

  return (
    <IngestContext.Provider
      value={{
        processing,
        activeProvider,
        ingestDataFiles,
        setGithubInput,
        setYoutubeInput,
        onClickProvider,
        handleFilesProviderChange,
        onClickFetchIngestData,
      }}
    >
      {children}
    </IngestContext.Provider>
  );
}

export { IngestProvider, IngestContext };
