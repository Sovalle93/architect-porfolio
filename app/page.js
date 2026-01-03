import ProjectGrid from './components/ProjectGrid';
import { PROJECTS_DATA } from './data/ProjectsData';

export default function Home() {
  const featuredProjects = PROJECTS_DATA.filter(project => project.featured);
  
  return (
    <main>
      <ProjectGrid projects={featuredProjects} />
    </main>
  );
}