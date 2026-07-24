import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import { assets, dummyCarData } from "../assets/assets";
import CarCard from "./CardCard";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();
  const [hoveredCard, setHoveredCard] = useState(null);

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: 80,
      opacity: 0,
      scale: 0.8,
      rotate: -5,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
    hover: {
      y: -15,
      scale: 1.03,
      boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 30px rgba(59, 130, 246, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
    whileHover: {
      x: 5,
      transition: { duration: 0.2 },
    },
  };

  const arrowVariants = {
    initial: { x: 0 },
    hover: {
      x: 10,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    hover: {
      x: "100%",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const decorativeVariants = {
    hidden: { scale: 0, opacity: 0, rotate: 45 },
    visible: {
      scale: 1,
      opacity: 0.1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <motion.div
        variants={decorativeVariants}
        className="absolute top-20 right-10 w-72 h-72 bg-primary rounded-full blur-3xl opacity-0"
      />
      <motion.div
        variants={decorativeVariants}
        custom={1}
        className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-0"
      />

      {/* Title with animation */}
      <motion.div
        variants={titleVariants}
        className="relative"
      >
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventure."
        />
        
        {/* Decorative underline with animation */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full mx-auto mt-2"
        />
      </motion.div>

      {/* Cars Grid with staggered animations */}
      <motion.div
        variants={gridVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 w-full"
      >
        <AnimatePresence>
          {cars.slice(0, 6).map((car, index) => (
            <motion.div
              key={car._id}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              custom={index}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative"
            >
              {/* Shimmer effect on hover */}
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate={hoveredCard === index ? "hover" : "initial"}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl pointer-events-none"
                style={{ zIndex: 10 }}
              />
              
              {/* Card glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: hoveredCard === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-xl blur-xl opacity-0"
                style={{ zIndex: -1 }}
              />
              
              <CarCard car={car} />
              
              {/* Animated badge for featured cars */}
              {index < 2 && (
                <motion.div
                  initial={{ x: 50, opacity: 0, rotate: 45 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                >
                  {index === 0 ? "⭐ Featured" : "🔥 Popular"}
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Explore All Cars Button with animations */}
      <motion.button
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={() => {
          navigate("/cars");
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className="mt-12 flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dull transition-all duration-300 relative overflow-hidden group"
      >
        {/* Button background shimmer */}
        <motion.div
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        
        <span className="relative z-10">Explore All Cars</span>
        
        <motion.img
          src={assets.arrow_icon}
          alt="Arrow"
          className="w-4 relative z-10"
          variants={arrowVariants}
          initial="initial"
          whileHover="hover"
        />
        
        {/* Ripple effect on click */}
        <motion.span
          className="absolute inset-0 rounded-lg bg-white"
          initial={{ scale: 0, opacity: 0.5 }}
          whileTap={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.button>

      {/* Animated view counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 flex items-center gap-8 text-sm text-gray-500"
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-green-500 rounded-full"
          />
          <span>{cars.length}+ vehicles available</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span>✨</span>
          <span>24/7 customer support</span>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default FeaturedSection;