import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ProjectDetailFormProps = {
  projectDetailData: API.Project;
};

function ProjectDetailForm(props: ProjectDetailFormProps) {
  const { projectDetailData } = props;
  return (
    <div className="sm:col-span-3 rounded-3xl">
      <Card className="rounded-3xl bg-gray-50">
        <CardHeader className="border-b-2 drop-shadow-md">
          <CardTitle>Customize</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Top K</Label>
                <CardDescription>
                  The number of results to return for each query
                </CardDescription>
                <Input
                  type="number"
                  id="topK"
                  placeholder="3"
                  value={projectDetailData.top_k}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Model</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">gpt-3.5-turbo</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
export default ProjectDetailForm;
