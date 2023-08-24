import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeDocsCard from '@/pages/ProjectDetailUploadDataSource/components/CodeDocsCard';
import WebsiteCard from '@/pages/ProjectDetailUploadDataSource/components/WebsiteCard';

type TabListProps = {
  setType: (type: string) => void;
  ingestData: API.IngestDataClientUsingPostBody;
  setIngestData: (ingestData: API.IngestDataClientUsingPostBody) => void;
  onClickIngestData: () => void;
  codeDocsProvider: any;
  setCodeDocsProvider: any;
  websiteProvider: any;
  setWebsiteProvider: any;
};

export function TabList(props: TabListProps) {
  const {
    setType,
    ingestData,
    setIngestData,
    onClickIngestData,
    codeDocsProvider,
    setCodeDocsProvider,
    websiteProvider,
    setWebsiteProvider,
  } = props;
  return (
    <Tabs defaultValue="codeDocs" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="codeDocs">Code & Docs</TabsTrigger>
        <TabsTrigger value="website">Website</TabsTrigger>
      </TabsList>
      <CodeDocsCard
        setType={setType}
        ingestData={ingestData}
        setIngestData={setIngestData}
        onClickIngestData={onClickIngestData}
        codeDocsProvider={codeDocsProvider}
        setCodeDocsProvider={setCodeDocsProvider}
      />
      <WebsiteCard
        setType={setType}
        ingestData={ingestData}
        setIngestData={setIngestData}
        onClickIngestData={onClickIngestData}
        websiteProvider={websiteProvider}
        setWebsiteProvider={setWebsiteProvider}
      />
    </Tabs>
  );
}
