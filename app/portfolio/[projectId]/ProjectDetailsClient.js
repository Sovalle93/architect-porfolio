'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ProjectImageGrid from '../../components/ProjectImageGrid';
import { leagueGothic, abrilFatface } from '../../fontprovider';

// This is now a Client Component that receives the project data as props
export default function ProjectDetailClient({ project }) {

  // Animation variants (moved here from the page)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#f6f6f2] py-12 px-8 sm:px-16 lg:px-32"
    >
      <div className="container mx-auto">
        <motion.div variants={itemVariants} className="mb-8 p-2">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            ← Volver a Proyectos
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Column - Descriptive Text */}
          <motion.div variants={itemVariants} className="w-full lg:w-2/5">
            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-bold text-gray-900 mb-4" 
              style={leagueGothic.style}
            >
              {project.title}
            </motion.h1>
            <motion.h2 
              variants={itemVariants}
              className="text-2xl text-gray-700 mb-2" 
              style={leagueGothic.style}
            >
              {project.place}
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8" 
              style={abrilFatface.style}
            >
              {project.year}
            </motion.p>
          </motion.div>

          {/* Right Column - Image Grid */}
          <motion.div variants={itemVariants} className="w-full lg:w-3/5">
            <ProjectImageGrid images={project.images} title={project.title} />
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}