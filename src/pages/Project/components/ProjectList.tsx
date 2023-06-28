import ProjectItem from './ProjectItem';

type ProjectListProps = {
  ProjectListData: API.Project[];
};

function ProjectList(props: ProjectListProps) {
  const { ProjectListData } = props;
  return (
    <div className="grid grid-cols-3 gap-10">
      {ProjectListData.map((item) => {
        return <ProjectItem key={item._id} item={item} />;
      })}
    </div>
  );
}

export default ProjectList;
