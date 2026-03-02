'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { leagueGothic, abrilFatface } from '../fontprovider'
import { GALLERY_DATA } from '../data/GalleryData' // Import the new data

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  const openLightbox = (item, imageUrl, imageIndex) => {
    setSelectedItem(item)
    setSelectedImage({ item, imageUrl, imageIndex })
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    setSelectedItem(null)
  }

  const nextImage = () => {
    if (selectedImage && selectedItem) {
      const currentIndex = selectedImage.imageIndex
      const nextIndex = (currentIndex + 1) % selectedItem.images.length
      setSelectedImage({
        ...selectedImage,
        imageUrl: selectedItem.images[nextIndex],
        imageIndex: nextIndex
      })
    }
  }

  const prevImage = () => {
    if (selectedImage && selectedItem) {
      const currentIndex = selectedImage.imageIndex
      const prevIndex = (currentIndex - 1 + selectedItem.images.length) % selectedItem.images.length
      setSelectedImage({
        ...selectedImage,
        imageUrl: selectedItem.images[prevIndex],
        imageIndex: prevIndex
      })
    }
  }

  return (
    <>
      <section className="py-24 px-8 bg-[#f6f6f2] sm:px-16 lg:px-32 xl:px-48">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-16 text-black" style={leagueGothic.style}>
            Objetos
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {GALLERY_DATA.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                {/* Clickable image - opens lightbox */}
                <div 
                  className="w-full h-64 overflow-hidden rounded-lg shadow-md"
                  onClick={() => openLightbox(item, item.images[0], 0)}
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Item info */}
                <div className="mt-4 text-center">
                  <h3 
                    className="text-xl text-gray-900 tracking-tight"
                    style={leagueGothic.style}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-gray-600 mt-1"
                    style={abrilFatface.style}
                  >
                    {item.category} • {item.year}
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
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-50 w-12 h-12 flex items-center justify-center"
            >
              ×
            </button>

            {/* Navigation Arrows */}
            {selectedItem && selectedItem.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors z-50 w-12 h-12 flex items-center justify-center"
                >
                  ←
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors z-50 w-12 h-12 flex items-center justify-center"
                >
                  →
                </button>
              </>
            )}

            {/* Image Container */}
            <motion.div
              key={selectedImage.imageUrl}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.item.title}
                className="w-full h-auto max-h-[85vh] object-contain mx-auto"
              />
              
              {/* Image counter and title */}
              <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                <h3 className="text-xl mb-1" style={leagueGothic.style}>
                  {selectedImage.item.title}
                </h3>
                {selectedItem && selectedItem.images.length > 1 && (
                  <p className="text-sm text-gray-300">
                    {selectedImage.imageIndex + 1} / {selectedItem.images.length}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}