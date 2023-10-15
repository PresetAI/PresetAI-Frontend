import { useContext } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import GithubIcon from '@/assets/icons/github.png';
import FileIcon from '@/assets/icons/file.png';
import YoutubeIcon from '@/assets/icons/youtube.png';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { IngestContext } from '@/contexts/ingest_context';

type CodeDocsCardProps = {
  projectId: string | undefined;
};

function CodeDocsCard(props: CodeDocsCardProps) {
  const { projectId } = props;
  const {
    activeProvider,
    ingestDataFiles,
    onClickProvider,
    setGithubInput,
    setYoutubeInput,
    handleFilesProviderChange,
    onClickFetchIngestData,
  } = useContext(IngestContext);

  return (
    <TabsContent value="codeDocs">
      <Card>
        <CardHeader>
          <CardTitle>Provider</CardTitle>
          <CardDescription>
            Please choose the provider you want to use to ingest your data.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-x-2 gap-y-2 grid grid-cols-2">
          <Button
            variant={activeProvider === 'github' ? 'secondary' : 'outline'}
            onClick={() => onClickProvider('github')}
          >
            <img src={GithubIcon} alt="github" className="w-4 h-4 mr-2" />
            Github
          </Button>
          <Button
            variant={activeProvider === 'files' ? 'secondary' : 'outline'}
            onClick={() => onClickProvider('files')}
          >
            <img src={FileIcon} alt="files" className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
          <Button
            variant={activeProvider === 'youtube' ? 'secondary' : 'outline'}
            onClick={() => onClickProvider('youtube')}
          >
            <img src={YoutubeIcon} alt="files" className="w-4 h-4 mr-2" />
            Youtube
          </Button>
        </CardContent>
        <CardContent className="space-y-2">
          {activeProvider === 'github' ? (
            <div className="space-y-2">
              <Label htmlFor="new">Enter your public GitHub URL:</Label>
              <Input
                id="new"
                type="url"
                placeholder="github.com/username/repo"
                onChange={(e) => setGithubInput(e.target.value)}
              />
            </div>
          ) : null}
          {activeProvider === 'files' ? (
            <div className="flex flex-col gap-2">
              <Label htmlFor="new">
                Upload your Markdown, PDF or txt files:
              </Label>
              <Label
                htmlFor="file-upload"
                className="relative h-10 px-4 py-2 flex items-center justify-center cursor-pointer rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground font-normal text-primary focus-within:outline-none"
              >
                <span>Choose Files</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={(e) => handleFilesProviderChange(e)}
                  multiple
                />
              </Label>
              {ingestDataFiles !== null ? (
                <p className="text-center text-sm">
                  Total files: {ingestDataFiles.length}
                </p>
              ) : null}
            </div>
          ) : null}
          {activeProvider === 'youtube' ? (
            <div className="space-y-2">
              <Label htmlFor="new">Enter Youtube URL:</Label>
              <Input
                id="new"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                onChange={(e) => setYoutubeInput(e.target.value)}
              />
            </div>
          ) : null}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => onClickFetchIngestData(projectId)}
          >
            Upload
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

export default CodeDocsCard;
