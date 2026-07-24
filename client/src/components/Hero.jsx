import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const {
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    navigate,
  } = useAppContext();

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    navigate(
      `/cars?pickupLocation=${encodeURIComponent(pickupLocation)}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    );
    
    setIsSearching(false);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const headingVariants = {
    hidden: { y: -50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  };

  const formVariants = {
    hidden: { y: 100, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
    hover: {
      boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
      transition: { duration: 0.3 },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "#var(--primary-color)",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)",
      transition: { type: "spring", stiffness: 400 },
    },
    hover: {
      scale: 1.01,
      transition: { type: "spring", stiffness: 400 },
    },
  };

  const labelVariants = {
    initial: { x: 0 },
    focus: {
      x: 5,
      color: "#var(--primary-color)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
      transition: { type: "spring", stiffness: 400 },
    },
    tap: { scale: 0.95 },
    loading: {
      scale: 0.98,
      opacity: 0.8,
      transition: { duration: 0.2 },
    },
  };

  const carImageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 1,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.02,
      rotate: 2,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-light flex flex-col items-center justify-center px-6 pt-24 overflow-hidden"
    >
      {/* Heading with animation */}
      <motion.div
        variants={headingVariants}
        className="text-center max-w-3xl"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-gray-900"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Luxury Cars on Rent
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="block h-1 bg-primary mt-2 rounded-full mx-auto"
          />
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-5 text-gray-500 text-lg"
        >
          Choose from our premium collection of luxury vehicles and enjoy
          comfortable, safe and affordable rides.
        </motion.p>
      </motion.div>

      {/* Search Form */}
      <motion.form
        onSubmit={handleSearch}
        variants={formVariants}
        whileHover="hover"
        className="mt-12 bg-white rounded-3xl shadow-xl w-full max-w-6xl p-6 flex flex-col lg:flex-row items-center gap-6 relative"
      >
        {/* Decorative gradient border */}
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-3xl opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ zIndex: -1 }}
        />

        {/* Pickup Location */}
        <motion.div
          variants={itemVariants}
          className="flex-1 w-full"
        >
          <motion.label
            variants={labelVariants}
            initial="initial"
            whileFocus="focus"
            className="font-medium text-gray-700 block"
          >
            Pickup Location
          </motion.label>

          <motion.select
            required
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            variants={inputVariants}
            whileFocus="focus"
            whileHover="hover"
            className="w-full mt-2 border rounded-lg p-3 outline-none cursor-pointer"
          >
            <option value="">Select City</option>

            {cityList.map((city) => (
              <motion.option
                key={city}
                value={city}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {city}
              </motion.option>
            ))}
          </motion.select>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500 mt-1"
          >
            {pickupLocation || "Please select location"}
          </motion.p>
        </motion.div>

        {/* Pickup Date */}
        <motion.div
          variants={itemVariants}
          className="flex-1 w-full"
        >
          <motion.label
            variants={labelVariants}
            initial="initial"
            whileFocus="focus"
            className="font-medium text-gray-700 block"
          >
            Pickup Date
          </motion.label>

          <motion.input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
            variants={inputVariants}
            whileFocus="focus"
            whileHover="hover"
            className="w-full mt-2 border rounded-lg p-3 outline-none"
          />
        </motion.div>

        {/* Return Date */}
        <motion.div
          variants={itemVariants}
          className="flex-1 w-full"
        >
          <motion.label
            variants={labelVariants}
            initial="initial"
            whileFocus="focus"
            className="font-medium text-gray-700 block"
          >
            Return Date
          </motion.label>

          <motion.input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            min={pickupDate || new Date().toISOString().split("T")[0]}
            required
            variants={inputVariants}
            whileFocus="focus"
            whileHover="hover"
            className="w-full mt-2 border rounded-lg p-3 outline-none"
          />
        </motion.div>

        {/* Search Button */}
        <motion.button
          type="submit"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          animate={isSearching ? "loading" : "initial"}
          disabled={isSearching}
          className="bg-primary hover:bg-primary-dull transition text-white px-8 py-4 rounded-xl flex items-center gap-3 mt-6 lg:mt-7 disabled:opacity-70"
        >
          <motion.img
            src={assets.search_icon}
            alt="search"
            className="w-5 h-5"
            animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1, repeat: isSearching ? Infinity : 0 }}
          />
          {isSearching ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Searching...
            </motion.span>
          ) : (
            "Search"
          )}
        </motion.button>
      </motion.form>

      {/* Car Image with floating animation */}
      <motion.div
        variants={carImageVariants}
        whileHover="hover"
        className="mt-16 relative"
      >
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="relative"
        >
          <img
            src={assets.main_car}
            alt="Luxury Car"
            className="w-full max-w-5xl object-contain"
          />
          
          {/* Animated glow effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1.2 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 bg-primary rounded-full blur-3xl"
            style={{ zIndex: -1 }}
          />
        </motion.div>

        {/* Decorative floating particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [-20, -80, -140],
              x: [0, i * 20 - 20, i * 10 - 10],
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="absolute w-2 h-2 bg-primary rounded-full"
            style={{
              left: `${30 + i * 20}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </motion.div>

      {/* Animated bottom gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none"
      />
    </motion.section>
  );
};

export default Hero;