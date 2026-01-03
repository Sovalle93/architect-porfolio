'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { leagueGothic, abrilFatface } from '../fontprovider'
import { PROJECTS_DATA } from '../data/ProjectsData'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  const openLightbox = (project, imageUrl) => {
    setSelectedImage({ project, imageUrl })
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <section className="py-24 px-8 bg-[#f6f6f2] sm:px-16 lg:px-32 xl:px-48">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS_DATA.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                {/* Clickable image - opens lightbox instead of navigation */}
                <div 
                  className="w-full h-64 overflow-hidden"
                  onClick={() => openLightbox(project, project.images[0][0])}
                >
                  <img
                    src={project.images[0][0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Project info */}
                <div className="mt-4">
                  <h3 
                    className="text-xl text-gray-900 tracking-tight"
                    style={leagueGothic.style}
                  >
                    {project.title}
                  </h3>
                  <p 
                    className="text-gray-700 mt-1"
                    style={leagueGothic.style}
                  >
                    {project.place}
                  </p>
                  <p 
                    className="text-gray-600 mt-1"
                    style={abrilFatface.style}
                  >
                    {project.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button (X) */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-60"
            >
              ×
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
            >
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.project.title}
                className="w-full h-auto max-h-[90vh] object-contain"
              />
              
              {/* Optional: Project info below the expanded image */}
              <div className="text-white text-center mt-4">
                <h3 className="text-xl" style={leagueGothic.style}>
                  {selectedImage.project.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}