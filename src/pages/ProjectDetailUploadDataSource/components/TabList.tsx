import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeDocsCard from '@/pages/ProjectDetailUploadDataSource/components/CodeDocsCard';
import WebsiteCard from '@/pages/ProjectDetailUploadDataSource/components/WebsiteCard';

type TabListProps = {
  projectId: string | undefined;
};
export function TabList(props: TabListProps) {
  const { projectId } = props;
  return (
    <Tabs defaultValue="codeDocs" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-1">
        <TabsTrigger value="codeDocs">Code & Docs</TabsTrigger>
        {/*<TabsTrigger value="website">Website</TabsTrigger>*/}
      </TabsList>
      <CodeDocsCard projectId={projectId} />
      {/*<WebsiteCard*/}
      {/*  setType={setType}*/}
      {/*  ingestData={ingestData}*/}
      {/*  setIngestData={setIngestData}*/}
      {/*  onClickIngestData={onClickIngestData}*/}
      {/*  websiteProvider={websiteProvider}*/}
      {/*  setWebsiteProvider={setWebsiteProvider}*/}
      {/*/>*/}
    </Tabs>
  );
}
