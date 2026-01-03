import { notFound } from 'next/navigation';
import { PROJECTS_DATA } from '../../data/ProjectsData';
import ProjectDetailClient from './ProjectDetailsClient';

// These are server-side functions - MUST stay in this file
export async function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    projectId: project.id.toString(),
  }));
}

// FIX: Add 'await' to the params destructuring
export async function generateMetadata({ params }) {
  // Properly await the params if they are asynchronous
  const { projectId } = await params; // <-- This is the key fix
  const project = PROJECTS_DATA.find(p => p.id.toString() === projectId);
  if (!project) {
    return {
      title: 'Project Not Found'
    };
  }
  return {
    title: `${project.title} | Architect Portfolio`,
    description: project.description,
  };
}

// FIX: Add 'await' to the params destructuring
export default async function ProjectDetailPage({ params }) { // <-- Note the 'async' here
  // Properly await the params if they are asynchronous
  const { projectId } = await params; // <-- This is the key fix
  const project = PROJECTS_DATA.find(p => p.id.toString() === projectId);

  if (!project) {
    notFound();
  }

  // Pass the project data to the Client Component
  return <ProjectDetailClient project={project} />;
}