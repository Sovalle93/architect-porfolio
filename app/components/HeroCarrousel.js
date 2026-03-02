'use client'
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroCarousel = () => {
  // Curated selection of best images
  const curatedImages = [
    "https://res.cloudinary.com/dmivjpb65/image/upload/v1756388554/1_lpv14g.jpg",
    "https://res.cloudinary.com/dmivjpb65/image/upload/v1756303840/2_jpmymx.jpg",
    "https://res.cloudinary.com/dmivjpb65/image/upload/v1772473483/IMG_20240926_090238_zsy0y2.jpg",
    "https://res.cloudinary.com/dmivjpb65/image/upload/v1772473526/IMG_20240926_102701_atb8ii.jpg",
    "https://res.cloudinary.com/dmivjpb65/image/upload/v1756388372/2_inhctw.jpg",
    "https://res.cloudinary.com/dmivjpb65/image/upload/v1756391142/2_jmxox5.jpg",
    "https://res.cloudinary.com/dmivjpb65/image/upload/v1756388852/1_n9f05y.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1); // Always slide to the right
      setCurrentIndex((prevIndex) => (prevIndex + 1) % curatedImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [curatedImages.length]);

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
            src={curatedImages[currentIndex]}
            alt={`Featured project ${currentIndex + 1}`}
            className="w-full h-full object-cover p-4 md:p-8 lg:p-12"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroCarousel;