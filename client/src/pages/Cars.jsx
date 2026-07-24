import React, { useMemo, useState } from "react";
import Title from "../components/Title";
import CarCard from "../components/CardCard";
import { assets } from "../assets/assets";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "motion/react";

const Cars = () => {
  const [input, setInput] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [hoveredFilter, setHoveredFilter] = useState(false);

  // URL Search Params
  const [searchParams] = useSearchParams();

  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");

  // Context
  const { cars = [] } = useAppContext();

  // Filter Cars
  const filteredCars = useMemo(() => {
    let filtered = [...cars];

    // Search by location from Hero
    if (pickupLocation) {
      filtered = filtered.filter(
        (car) =>
          car.location.toLowerCase() === pickupLocation.toLowerCase()
      );
    }

    // Search input
    if (input.trim()) {
      const search = input.toLowerCase();

      filtered = filtered.filter(
        (car) =>
          car.brand.toLowerCase().includes(search) ||
          car.model.toLowerCase().includes(search) ||
          car.category.toLowerCase().includes(search) ||
          car.fuel_type.toLowerCase().includes(search) ||
          car.location.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [cars, input, pickupLocation]);

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const searchVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.2,
      },
    },
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(5, 88, 254, 0.2)",
      transition: { type: "spring", stiffness: 400 },
    },
  };

  const searchIconVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: 90,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const filterIconVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: 180,
      transition: { type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.8 },
  };

  const filterDropdownVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: { duration: 0.2 },
    },
  };

  const locationInfoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.3,
      },
    },
  };

  const resultsVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.4,
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
      y: 50,
      opacity: 0,
      scale: 0.8,
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
        duration: 0.5,
      },
    },
    exit: {
      y: -50,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 },
    },
  };

  const emptyVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -5 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6,
      },
    },
  };

  const emptyIconVariants = {
    initial: { scale: 1 },
    float: {
      y: [-10, 10, -10],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  const filterOptions = [
    { label: "All", value: "all" },
    { label: "SUV", value: "SUV" },
    { label: "Sedan", value: "Sedan" },
    { label: "Luxury", value: "Luxury" },
    { label: "Sports", value: "Sports" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <motion.div
        variants={headerVariants}
        className="flex flex-col items-center py-20 bg-light px-4 relative overflow-hidden"
      >
        {/* Decorative background */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.05 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />

        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure."
        />

        <motion.div
          variants={searchVariants}
          whileFocus="focus"
          className="flex items-center bg-white px-5 mt-8 max-w-xl w-full h-14 rounded-full shadow-md relative z-10"
        >
          <motion.img
            src={assets.search_icon}
            alt="search"
            className="w-5 h-5 mr-3 cursor-pointer"
            variants={searchIconVariants}
            initial="initial"
            whileHover="hover"
          />

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search by brand, model, category..."
            className="w-full outline-none bg-transparent"
          />

          <motion.div
            className="relative"
            onHoverStart={() => setHoveredFilter(true)}
            onHoverEnd={() => setHoveredFilter(false)}
          >
            <motion.img
              src={assets.filter_icon}
              alt="filter"
              className="w-5 h-5 ml-3 cursor-pointer"
              variants={filterIconVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            />

            {/* Filter dropdown */}
            <AnimatePresence>
              {hoveredFilter && (
                <motion.div
                  variants={filterDropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-20"
                >
                  {filterOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ x: 10, backgroundColor: "#f3f4f6" }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        // Handle filter selection
                        console.log("Filter:", option.value);
                      }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {pickupLocation && (
          <motion.div
            variants={locationInfoVariants}
            className="mt-5 text-gray-600 text-sm bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2"
            >
              <span className="text-primary">📍</span>
              <span className="font-semibold">Location:</span> {pickupLocation}
            </motion.span>

            {pickupDate && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 ml-4"
              >
                <span className="text-primary">📅</span>
                <span className="font-semibold">Pickup:</span> {pickupDate}
              </motion.span>
            )}

            {returnDate && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 ml-4"
              >
                <span className="text-primary">↩️</span>
                <span className="font-semibold">Return:</span> {returnDate}
              </motion.span>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Cars */}
      <motion.div
        variants={resultsVariants}
        className="px-6 md:px-16 lg:px-24 xl:px-32 py-12"
      >
        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Showing{" "}
          <motion.span
            key={filteredCars.length}
            initial={{ scale: 1.5, color: "#0558FE" }}
            animate={{ scale: 1, color: "#000000" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="font-semibold inline-block"
          >
            {filteredCars.length}
          </motion.span>{" "}
          Cars
          {input && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-primary ml-2"
            >
              (Searching: "{input}")
            </motion.span>
          )}
        </motion.p>

        <AnimatePresence mode="wait">
          {filteredCars.length > 0 ? (
            <motion.div
              key="grid"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car._id}
                  variants={cardVariants}
                  layoutId={car._id}
                  className="relative"
                >
                  {/* Card glow effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-xl blur-xl opacity-0"
                    style={{ zIndex: -1 }}
                  />
                  <CarCard car={car} />
                  
                  {/* Animated badge for new cars */}
                  {index < 2 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.5 + index * 0.1,
                      }}
                      className="absolute top-4 left-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10"
                    >
                      {index === 0 ? "✨ New" : "🔥 Popular"}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              variants={emptyVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="col-span-full text-center py-16"
            >
              <motion.div
                variants={emptyIconVariants}
                initial="initial"
                animate="float"
                className="text-6xl mb-6"
              >
                🚗
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-semibold text-gray-500"
              >
                No Cars Found
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 mt-2"
              >
                {input
                  ? `No results found for "${input}". Try a different search term.`
                  : "Try another location or search keyword."}
              </motion.p>

              {input && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setInput("")}
                  className="mt-6 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dull transition"
                >
                  Clear Search
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating scroll to top button */}
      <AnimatePresence>
        {filteredCars.length > 6 && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 bg-primary text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↑
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Cars;