import { Sidebar } from '../../layouts';
import ProjectDetailChatbot from './components/ProjectDetailChatbot';
import ProjectDetailForm from './components/ProjectDetailForm';

function ProjectDetail() {
  return (
    <Sidebar
      component={
        // <section className="grid grid-cols-2 gap-20">
        <section className="grid grid-cols-1 sm:grid-cols-9 justify-items-start place-items-start mx-auto px-8 sm:px-12 lg:px-16">
          <ProjectDetailChatbot />
          <ProjectDetailForm />
        </section>
      }
    />
  );
}

export default ProjectDetail;
