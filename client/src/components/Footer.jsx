import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "motion/react";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [hoveredSocial, setHoveredSocial] = useState(null);

  // Animation variants
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -45 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      rotate: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
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

  const headingVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    hover: {
      x: 5,
      color: "#0558FE",
      transition: { duration: 0.2 },
    },
  };

  const linkVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.1 + i * 0.05,
      },
    }),
    hover: {
      x: 10,
      color: "#0558FE",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const contactVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.2 + i * 0.1,
      },
    }),
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const socialVariants = {
    hidden: { scale: 0, opacity: 0, rotate: 45 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3 + i * 0.1,
      },
    }),
    hover: {
      scale: 1.15,
      y: -5,
      boxShadow: "0 8px 25px rgba(5, 88, 254, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.9,
      transition: { duration: 0.1 },
    },
  };

  const socialIconVariants = {
    hover: {
      rotate: 360,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 200,
      },
    },
  };

  const bottomVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  const dividerVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.3,
        duration: 0.8,
      },
    },
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const floatingVariants = {
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

  const shimmerVariants = {
    initial: { x: "-100%" },
    hover: {
      x: "100%",
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={footerVariants}
      className="bg-gray-950 text-gray-300 pt-16 relative overflow-hidden"
    >
      {/* Decorative background gradient */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Top Section */}
        <motion.div
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800"
        >
          {/* Company */}
          <motion.div variants={sectionVariants}>
            <motion.div
              variants={logoVariants}
              whileHover="hover"
              className="inline-block"
            >
              <img
                src={assets.logo}
                alt="CarRental Logo"
                className="h-10 mb-5"
              />
            </motion.div>

            <motion.p
              variants={textVariants}
              className="text-sm leading-7 text-gray-400"
            >
              CarRental offers premium and luxury vehicles at affordable
              prices. Safe, reliable, and convenient rentals for business,
              vacations, and everyday travel.
            </motion.p>

            {/* Trust badge */}
            <motion.div
              variants={textVariants}
              className="mt-4 flex items-center gap-2 text-xs text-gray-500"
            >
              <motion.span
                variants={pulseVariants}
                initial="initial"
                animate="pulse"
                className="w-2 h-2 bg-green-500 rounded-full inline-block"
              />
              Trusted by 30,000+ customers
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={sectionVariants}>
            <motion.h3
              variants={headingVariants}
              whileHover="hover"
              className="text-white text-lg font-semibold mb-5"
            >
              Quick Links
            </motion.h3>

            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Cars", path: "/cars" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <Link
                    to={link.path}
                    className="hover:text-primary transition inline-block"
                  >
                    {link.name}
                    <motion.span
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                      className="block h-0.5 bg-primary"
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={sectionVariants}>
            <motion.h3
              variants={headingVariants}
              whileHover="hover"
              className="text-white text-lg font-semibold mb-5"
            >
              Contact
            </motion.h3>

            <div className="space-y-3 text-sm">
              {[
                { icon: "📍", text: "Lahore, Pakistan" },
                { icon: "📞", text: "+92 300 1234567" },
                { icon: "✉️", text: "support@carrental.com" },
              ].map((item, index) => (
                <motion.p
                  key={index}
                  custom={index}
                  variants={contactVariants}
                  whileHover="hover"
                  className="flex items-center gap-3"
                >
                  <motion.span
                    variants={floatingVariants}
                    initial="initial"
                    animate="animate"
                    className="text-primary"
                  >
                    {item.icon}
                  </motion.span>
                  {item.text}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Social */}
          <motion.div variants={sectionVariants}>
            <motion.h3
              variants={headingVariants}
              whileHover="hover"
              className="text-white text-lg font-semibold mb-5"
            >
              Follow Us
            </motion.h3>

            <div className="flex gap-4 flex-wrap">
              {[
                { icon: assets.facebook_icon, name: "Facebook", color: "#1877F2" },
                { icon: assets.instagram_icon, name: "Instagram", color: "#E4405F" },
                { icon: assets.twitter_icon, name: "Twitter", color: "#1DA1F2" },
                { icon: assets.linkedin_icon, name: "LinkedIn", color: "#0A66C2" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  custom={index}
                  variants={socialVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onHoverStart={() => setHoveredSocial(index)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  className="relative group"
                  aria-label={social.name}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition relative overflow-hidden"
                    animate={{
                      backgroundColor: hoveredSocial === index ? social.color : "#1F2937",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      variants={shimmerVariants}
                      initial="initial"
                      animate={hoveredSocial === index ? "hover" : "initial"}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />

                    <motion.img
                      src={social.icon}
                      alt={social.name}
                      className="w-5 relative z-10"
                      variants={socialIconVariants}
                      animate={hoveredSocial === index ? "hover" : "initial"}
                    />
                  </motion.div>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredSocial === index && (
                      <motion.span
                        initial={{ opacity: 0, y: -10, scale: 0.8 }}
                        animate={{ opacity: 1, y: -5, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.8 }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-white bg-gray-800 px-2 py-1 rounded whitespace-nowrap"
                      >
                        {social.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </div>

            {/* Newsletter teaser */}
            <motion.p
              variants={textVariants}
              className="mt-6 text-xs text-gray-500 flex items-center gap-2"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.span>
              Subscribe to our newsletter
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Divider with animation */}
        <motion.div
          variants={dividerVariants}
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"
        />

        {/* Bottom */}
        <motion.div
          variants={bottomVariants}
          className="py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500"
        >
          <motion.p
            whileHover={{ color: "#0558FE" }}
            transition={{ duration: 0.2 }}
          >
            © {currentYear} CarRental. All Rights Reserved.
          </motion.p>

          <div className="flex gap-6 mt-4 md:mt-0">
            {[
              { name: "Privacy Policy", path: "/privacy" },
              { name: "Terms & Conditions", path: "/terms" },
            ].map((link, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={link.path}
                  className="hover:text-primary transition inline-block"
                >
                  {link.name}
                  <motion.span
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    className="block h-0.5 bg-primary"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Back to top button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 bg-primary text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↑
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;