import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';

type WebsiteCardProps = {
  setType: (type: string) => void;
  ingestData: API.IngestDataClientUsingPostBody;
  setIngestData: (ingestData: API.IngestDataClientUsingPostBody) => void;
  onClickIngestData: () => void;
  websiteProvider: any;
  setWebsiteProvider: any;
};

function WebsiteCard(props: WebsiteCardProps) {
  const {
    setType,
    ingestData,
    setIngestData,
    onClickIngestData,
    websiteProvider,
    setWebsiteProvider,
  } = props;

  const onClickProvider = (id: number) => {
    // set codeDocsProvider selected to true
    const newCodeDocsProvider = websiteProvider.map((item: any) => {
      if (item.id === id) {
        return { ...item, selected: true };
      }
      return { ...item, selected: false };
    });
    setWebsiteProvider(newCodeDocsProvider);
  };

  const onClickType = (provider: string) => {
    setType(provider);
    setIngestData({ ...ingestData, provider });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngestData({ ...ingestData, url: e.target.value });
    console.log(ingestData);
  };

  return (
    <TabsContent value="website">
      <Card>
        <CardHeader>
          <CardTitle>Provider</CardTitle>
          <CardDescription>
            Please choose the provider you want to use to ingest your data.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-x-2 grid grid-cols-2">
          {websiteProvider.map((item: any) => {
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
          {websiteProvider.map((item: any) => {
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

export default WebsiteCard;
