'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import ImageBox from './ImageBox';
import { leagueGothic, abrilFatface } from '../fontprovider';

const ProjectGrid = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return <div>No projects found.</div>;
  }

  return (
    <section className="py-24 bg-[#f6f6f2] px-8">
      <div className="container mx-auto">
        {/* Main 3x3 grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/portfolio/${project.id}`}>
                {/* Image pattern FIRST - using first image group */}
                <ImageBox 
                  imageUrls={project.images[0]} 
                  pattern={index % 3} 
                  altText={project.title}
                />

                {/* Project title and info BELOW the image */}
                <div className="mt-6 text-center"> {/* Changed mb-6 to mt-6 */}
                  <h3 
                    className="text-2xl text-gray-900 tracking-tight"
                    style={leagueGothic.style}
                  >
                    {project.title}
                  </h3>
                  <h4 
                    className="text-xl text-gray-900 tracking-tight mt-1"
                    style={leagueGothic.style}
                  >
                    {project.place}
                  </h4>
                  <p 
                    className="text-gray-700 mt-2"
                    style={abrilFatface.style}
                  >
                    {project.year}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;