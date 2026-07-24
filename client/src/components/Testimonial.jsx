import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const testimonials = [
  {
    id: 1,
    name: "Donald Jackman",
    role: "Business Executive",
    image:
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png",
    review:
      "The booking process was incredibly smooth. The car was spotless, luxurious, and exactly as advertised. Highly recommended!",
  },
  {
    id: 2,
    name: "Richard Nelson",
    role: "Software Engineer",
    image:
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage2.png",
    review:
      "Excellent customer service and premium quality vehicles. I'll definitely rent from them again for my next trip.",
  },
  {
    id: 3,
    name: "James Washington",
    role: "Entrepreneur",
    image:
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage3.png",
    review:
      "One of the best luxury car rental experiences I've ever had. Affordable pricing and an amazing collection of vehicles.",
  },
];

function Testimonial() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -45 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const titleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.1,
      },
    },
  };

  const subtitleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: 80,
      opacity: 0,
      scale: 0.9,
      rotateX: 15,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
    hover: {
      y: -15,
      scale: 1.05,
      boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const cardGlowVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const starsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.3 + i * 0.05,
      },
    }),
  };

  const quoteVariants = {
    initial: { scale: 0, rotate: -45, opacity: 0 },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.4,
      },
    },
  };

  const userVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  const statVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.8 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.6 + i * 0.1,
      },
    }),
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const statNumberVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.8, duration: 0.5 },
    },
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    hover: {
      x: "100%",
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
      className="py-24 px-6 bg-gray-50 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div variants={headerVariants} className="text-center mb-16">
          <motion.span
            variants={badgeVariants}
            className="text-primary font-semibold uppercase tracking-widest inline-block bg-primary/10 px-4 py-2 rounded-full"
          >
            Testimonials
          </motion.span>

          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold mt-3"
          >
            What Our{" "}
            <motion.span
              initial={{ opacity: 0, backgroundSize: "0% 100%" }}
              whileInView={{ opacity: 1, backgroundSize: "100% 100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text bg-no-repeat"
            >
              Customers Say
            </motion.span>
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            className="text-gray-500 mt-5 max-w-2xl mx-auto"
          >
            Thousands of customers trust us for premium luxury car rentals,
            professional service, and unforgettable driving experiences.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-white rounded-2xl p-8 shadow-md relative overflow-hidden group"
            >
              {/* Card glow effect */}
              <motion.div
                variants={cardGlowVariants}
                initial="initial"
                animate={hoveredCard === index ? "hover" : "initial"}
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-2xl"
              />

              {/* Shimmer effect */}
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate={hoveredCard === index ? "hover" : "initial"}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />

              {/* Quote icon */}
              <motion.div
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                className="text-6xl text-primary/10 absolute top-4 right-6 font-serif"
              >
                "
              </motion.div>

              {/* Stars */}
              <div className="flex mb-5 text-yellow-400 text-xl relative z-10">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={starsVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    ⭐
                  </motion.span>
                ))}
              </div>

              {/* Review */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 leading-7 relative z-10"
              >
                "{item.review}"
              </motion.p>

              {/* User */}
              <motion.div
                variants={userVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center mt-8 relative z-10"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                  />
                </motion.div>

                <div className="ml-4">
                  <motion.h3
                    className="font-semibold text-lg"
                    whileHover={{ color: "#0558FE" }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.h3>

                  <p className="text-gray-500 text-sm">{item.role}</p>
                </div>

                {/* Verification badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="ml-auto bg-green-500 text-white text-xs px-2 py-1 rounded-full"
                >
                  ✓ Verified
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.8,
              },
            },
          }}
        >
          {[
            { number: "30K+", label: "Happy Customers", icon: "😊" },
            { number: "500+", label: "Luxury Cars", icon: "🚗" },
            { number: "100+", label: "Cities Covered", icon: "🌍" },
            { number: "4.9★", label: "Customer Rating", icon: "⭐" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={statVariants}
              whileHover="hover"
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <motion.div
                variants={floatVariants}
                initial="initial"
                animate="animate"
                className="text-3xl mb-2"
              >
                {stat.icon}
              </motion.div>

              <motion.h3
                variants={statNumberVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl font-bold text-primary"
              >
                {stat.number}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="text-gray-500 mt-2"
              >
                {stat.label}
              </motion.p>

              {/* Animated progress bar */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.8 }}
                className="h-1 bg-primary/20 rounded-full mt-4 overflow-hidden"
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "0%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.8 }}
                  className="h-full w-2/3 bg-gradient-to-r from-primary to-purple-500 rounded-full"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-center mt-12 text-sm text-gray-500"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mr-2"
          >
            🔒
          </motion.div>
          Trusted by 30,000+ satisfied customers worldwide
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Testimonial;