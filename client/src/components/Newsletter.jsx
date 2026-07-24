import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setEmail("");
    }, 3000);
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const containerVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
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

  const titleVariants = {
    hidden: { y: -30, opacity: 0, scale: 0.8 },
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

  const textVariants = {
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

  const formVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.3,
      },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.3)",
      transition: { type: "spring", stiffness: 400 },
    },
    hover: {
      scale: 1.01,
      transition: { type: "spring", stiffness: 400 },
    },
    error: {
      borderColor: "#ff4444",
      boxShadow: "0 0 0 3px rgba(255, 68, 68, 0.3)",
      transition: { duration: 0.2 },
    },
    success: {
      borderColor: "#4CAF50",
      boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.3)",
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
    loading: {
      scale: 0.98,
      opacity: 0.8,
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

  const successVariants = {
    hidden: { scale: 0, opacity: 0, y: -20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const errorVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    exit: {
      x: 20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const floatingParticlesVariants = {
    initial: { opacity: 0 },
    animate: (i) => ({
      opacity: [0, 0.5, 0],
      y: [0, -60 - i * 20],
      x: [0, (i - 2) * 30],
      transition: {
        duration: 4 + i,
        delay: i * 0.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeOut",
      },
    }),
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    hover: {
      x: "100%",
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-8, 8, -8],
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
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Decorative floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={floatingParticlesVariants}
          initial="initial"
          animate="animate"
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
          }}
        />
      ))}

      {/* Decorative circles */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.05 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.05 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
      />

      <motion.div
        variants={containerVariants}
        whileHover="hover"
        className="max-w-5xl mx-auto rounded-3xl
        bg-gradient-to-r from-primary to-blue-400
        px-8 md:px-16 py-16 text-center text-white relative overflow-hidden"
      >
        {/* Shimmer effect */}
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="hover"
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
        />

        {/* Heading */}
        <motion.h2
          variants={titleVariants}
          className="text-3xl md:text-5xl font-bold relative z-10"
        >
          Stay{" "}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="inline-block"
          >
            Updated
          </motion.span>
        </motion.h2>

        <motion.p
          variants={textVariants}
          className="mt-5 max-w-2xl mx-auto text-white/90 leading-7 relative z-10"
        >
          Subscribe to our newsletter and be the first to know about
          exclusive discounts, premium vehicle launches, seasonal offers,
          and special rental deals.
        </motion.p>

        {/* Form */}
        <motion.form
          variants={formVariants}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto relative z-10"
        >
          <div className="flex-1 relative">
            <motion.input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              variants={inputVariants}
              whileFocus="focus"
              whileHover="hover"
              animate={
                error ? "error" : isSuccess ? "success" : "initial"
              }
              className="w-full px-6 py-4 rounded-full text-gray-800 bg-white outline-none relative z-10"
              disabled={isSubmitting || isSuccess}
            />

            {/* Input glow effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isSuccess ? { opacity: 1 } : { opacity: 0 }}
              className="absolute inset-0 rounded-full bg-green-500/20 blur-xl"
            />

            {/* Success checkmark */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 text-2xl"
                >
                  ✅
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            animate={isSubmitting ? "loading" : "initial"}
            disabled={isSubmitting || isSuccess}
            className="px-8 py-4 rounded-full bg-black text-white
            hover:bg-gray-900 transition duration-300 font-medium
            relative overflow-hidden disabled:opacity-90"
          >
            {/* Button shimmer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={isSubmitting ? { x: "100%" } : { x: "-100%" }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            {/* Button content */}
            <motion.span
              variants={buttonTextVariants}
              animate={isSubmitting ? "loading" : "initial"}
              className="relative z-10 flex items-center gap-2"
            >
              {isSuccess ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Subscribed! 🎉
                </motion.span>
              ) : (
                "Subscribe"
              )}
            </motion.span>

            {/* Loading spinner */}
            <motion.span
              variants={spinnerVariants}
              animate={isSubmitting ? "loading" : "initial"}
              className="absolute inset-0 flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-white"
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
        </motion.form>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              variants={errorVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-4 text-red-200 text-sm relative z-10"
            >
              ⚠️ {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 text-sm text-white/80 relative z-10 flex items-center justify-center gap-2"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔒
          </motion.span>
          We respect your privacy. No spam, only exclusive offers and updates.
        </motion.p>

        {/* Success overlay */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-4 bg-green-500/20 backdrop-blur-sm rounded-xl text-white relative z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-center justify-center gap-3"
              >
                <span className="text-3xl">🎉</span>
                <div>
                  <p className="font-semibold">Thank you for subscribing!</p>
                  <p className="text-sm text-white/80">
                    Check your inbox for exclusive offers.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative floating elements */}
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute top-4 left-8 text-4xl opacity-10"
        >
          ✉️
        </motion.div>
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute bottom-4 right-8 text-4xl opacity-10"
          style={{ animationDelay: "1s" }}
        >
          🚗
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Newsletter;