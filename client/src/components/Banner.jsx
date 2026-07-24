import React, { useState } from "react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleListCar = () => {
    setIsClicked(true);
    setTimeout(() => {
      navigate("/list-car");
      setIsClicked(false);
    }, 800);
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const containerVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 25,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.01,
      boxShadow: "0 20px 60px rgba(5, 88, 254, 0.3)",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const contentVariants = {
    hidden: { x: -80, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.3 + i * 0.1,
      },
    }),
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 30px rgba(255, 255, 255, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
    clicked: {
      scale: 0.9,
      backgroundColor: "#4CAF50",
      transition: { duration: 0.2 },
    },
  };

  const buttonTextVariants = {
    initial: { opacity: 1 },
    loading: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const spinnerVariants = {
    initial: { opacity: 0, rotate: 0 },
    loading: {
      opacity: 1,
      rotate: 360,
      transition: {
        rotate: {
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        },
        opacity: { duration: 0.2 },
      },
    },
  };

  const imageContainerVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: 0.4,
        duration: 0.8,
      },
    },
  };

  const imageVariants = {
    initial: { y: 0 },
    hover: {
      y: -10,
      rotate: 3,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: [0.1, 0.3, 0.1],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const particlesVariants = {
    initial: { opacity: 0 },
    animate: (i) => ({
      opacity: [0, 1, 0],
      y: [0, -100],
      x: [0, (i - 1) * 30],
      transition: {
        duration: 3 + i,
        delay: i * 0.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeOut",
      },
    }),
  };

  const floatingBadgeVariants = {
    hidden: { scale: 0, opacity: 0, y: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.8,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="max-w-7xl mx-auto px-6 md:px-10 py-20"
    >
      <motion.div
        variants={containerVariants}
        whileHover="hover"
        className="flex flex-col-reverse md:flex-row items-center justify-between
        bg-gradient-to-r from-[#0558FE] to-[#A9CFFF]
        rounded-3xl overflow-hidden px-8 md:px-14 py-10 relative"
      >
        {/* Animated background elements */}
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl opacity-0"
        />
        <motion.div
          variants={glowVariants}
          initial="initial"
          animate="animate"
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-300 rounded-full blur-3xl opacity-0"
        />

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={particlesVariants}
            initial="initial"
            animate="animate"
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
            }}
          />
        ))}

        {/* Left Content */}
        <motion.div
          variants={contentVariants}
          className="text-white max-w-xl relative z-10"
        >
          <motion.h2
            variants={titleVariants}
            whileHover="hover"
            className="text-3xl md:text-5xl font-bold leading-tight"
          >
            Do You Own a{" "}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="inline-block bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text"
            >
              Luxury Car?
            </motion.span>
          </motion.h2>

          <motion.p
            custom={0}
            variants={textVariants}
            className="mt-5 text-lg text-white/90"
          >
            Monetize your vehicle effortlessly by listing it on CarRental.
          </motion.p>

          <motion.p
            custom={1}
            variants={textVariants}
            className="mt-3 text-white/80 leading-7"
          >
            We take care of insurance, driver verification, secure payments,
            and customer support so you can earn passive income completely
            stress-free.
          </motion.p>

          {/* Button with loading state */}
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={isClicked ? "clicked" : "initial"}
            onClick={handleListCar}
            disabled={isClicked}
            className="mt-8 px-8 py-3 bg-white text-primary font-semibold
            rounded-full hover:bg-gray-100 transition duration-300
            relative overflow-hidden group disabled:opacity-90"
          >
            {/* Button shimmer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={isHovered ? { x: "100%" } : { x: "-100%" }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/30 to-transparent"
            />

            {/* Button content */}
            <motion.span
              variants={buttonTextVariants}
              animate={isClicked ? "loading" : "initial"}
              className="relative z-10 flex items-center gap-2"
            >
              <span>List Your Car</span>
              <motion.span
                animate={isHovered ? { x: 5 } : { x: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                →
              </motion.span>
            </motion.span>

            {/* Loading spinner */}
            <motion.span
              variants={spinnerVariants}
              animate={isClicked ? "loading" : "initial"}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </motion.span>
          </motion.button>

          {/* Trust badges */}
          <motion.div
            variants={floatingBadgeVariants}
            className="flex items-center gap-6 mt-8"
          >
            {[
              { icon: "🛡️", text: "Secure" },
              { icon: "⚡", text: "Fast" },
              { icon: "💳", text: "Easy" },
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="flex items-center gap-2 text-white/80 text-sm"
              >
                <span>{badge.icon}</span>
                <span>{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          variants={imageContainerVariants}
          className="mb-10 md:mb-0 relative z-10"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            variants={imageVariants}
            initial="initial"
            animate="float"
            whileHover="hover"
            className="relative"
          >
            <img
              src={assets.banner_car_image}
              alt="Luxury Car"
              className="w-full max-w-md object-contain"
            />

            {/* Glowing ring around car */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full border-2 border-white/20"
              style={{ zIndex: -1 }}
            />

            {/* Floating badge on image */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 1,
              }}
              className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
            >
              ✓ Verified
            </motion.div>

            {/* Price badge */}
            <motion.div
              initial={{ scale: 0, x: -20 }}
              animate={{ scale: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 1.2,
              }}
              className="absolute -bottom-2 -left-2 bg-white/90 backdrop-blur-sm text-primary text-sm font-bold px-4 py-2 rounded-full shadow-lg"
            >
              💰 Earn Passive Income
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Banner;