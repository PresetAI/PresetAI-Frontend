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

type CodeDocsCardProps = {
  setType: (type: string) => void;
  ingestData: API.IngestDataClientUsingPostBody;
  setIngestData: (ingestData: API.IngestDataClientUsingPostBody) => void;
  onClickIngestData: () => void;
  codeDocsProvider: any;
  setCodeDocsProvider: any;
};

function CodeDocsCard(props: CodeDocsCardProps) {
  const {
    setType,
    ingestData,
    setIngestData,
    onClickIngestData,
    codeDocsProvider,
    setCodeDocsProvider,
  } = props;

  const onClickProvider = (id: number) => {
    // set codeDocsProvider selected to true
    const newCodeDocsProvider = codeDocsProvider.map((item: any) => {
      if (item.id === id) {
        setIngestData({ ...ingestData, provider: item.provider });
        return { ...item, selected: true };
      }
      return { ...item, selected: false };
    });

    setCodeDocsProvider(newCodeDocsProvider);
  };

  return (
    <TabsContent value="codeDocs">
      <Card>
        <CardHeader>
          <CardTitle>Provider</CardTitle>
          <CardDescription>
            Please choose the provider you want to use to ingest your data.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-x-2 grid grid-cols-2">
          {codeDocsProvider.map((item: any) => {
            return (
              <Button
                key={item.id}
                variant={item.selected ? 'secondary' : 'outline'}
                onClick={() => onClickProvider(item.id)}
              >
                <img src={item.icon} alt={item.name} className="w-4 h-4 mr-2" />
                {item.name}
              </Button>
            );
          })}
        </CardContent>
        <CardContent className="space-y-2">
          {codeDocsProvider.map((item: any) => {
            if (item.selected) {
              return <div key={item.id}>{item.code}</div>;
            }
          })}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => onClickIngestData()}>
            Upload
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

export default CodeDocsCard;
