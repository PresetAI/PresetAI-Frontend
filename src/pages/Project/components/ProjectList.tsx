import ProjectItem from './ProjectItem';

type ProjectListProps = {
  projectsListData: API.Project[];
};

function ProjectList(props: ProjectListProps) {
  const { projectsListData } = props;
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
      {projectsListData.map((item: API.Project) => {
        return <ProjectItem key={item._id} item={item} />;
      })}
    </div>
  );
}

export default ProjectList;
