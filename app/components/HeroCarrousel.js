'use client'
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '../data/ProjectsData';

const HeroCarousel = () => {
  // Collect all images from all projects
  const allImages = PROJECTS_DATA.flatMap(project => 
    project.images.flat() // Flatten all image groups into one array
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1); // Always slide to the right
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [allImages.length]);

  // Variants for slide animation
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
    }),
    center: {
      x: 0,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
    })
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ 
            x: { type: "tween", duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src={allImages[currentIndex]}
            alt={`Architecture project ${currentIndex + 1}`}
            className="w-full h-full object-contain p-4 md:p-8 lg:p-12"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroCarousel;