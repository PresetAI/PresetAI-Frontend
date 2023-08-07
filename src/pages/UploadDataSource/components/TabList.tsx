import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeDocsCard from '@/pages/UploadDataSource/components/CodeDocsCard';

type TabListProps = {
  setType: (type: string) => void;
  ingestData: API.IngestDataClientUsingPostBody;
  setIngestData: (ingestData: API.IngestDataClientUsingPostBody) => void;
  onClickIngestData: () => void;
  codeDocsProvider: any;
  setCodeDocsProvider: any;
};

export function TabList(props: TabListProps) {
  const {
    setType,
    ingestData,
    setIngestData,
    onClickIngestData,
    codeDocsProvider,
    setCodeDocsProvider,
  } = props;
  return (
    <Tabs defaultValue="account" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Code & Docs</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <CodeDocsCard
        setType={setType}
        ingestData={ingestData}
        setIngestData={setIngestData}
        onClickIngestData={onClickIngestData}
        codeDocsProvider={codeDocsProvider}
        setCodeDocsProvider={setCodeDocsProvider}
      />
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
