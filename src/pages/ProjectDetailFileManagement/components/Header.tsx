import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  filterText: string;
  setFilterText: (value: string) => void;
};

function Header(props: Props) {
  const { filterText, setFilterText } = props;
  return (
    <div className="">
      <div className="sm:flex-auto">
        <h1 className="text-3xl font-bold leading-6 text-gray-900">
          File Management
        </h1>
      </div>
      <div className="flex justify-between py-8 pb-4">
        <Input
          className="w-96"
          type="text"
          placeholder="Search by Filename"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <Button className="text-sm font-semibold">Add New Data Sources</Button>
      </div>
    </div>
  );
}

export default Header;
