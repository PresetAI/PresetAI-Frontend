import { Sidebar } from '../../layouts';
import ProjectDetailChatbot from './components/ProjectDetailChatbot';
import ProjectDetailForm from './components/ProjectDetailForm';

function ProjectDetail() {
  return (
    <Sidebar
      component={
        <section className="grid grid-cols-2 gap-20">
          <ProjectDetailChatbot />
          <ProjectDetailForm />
        </section>
      }
    />
  );
}

export default ProjectDetail;
