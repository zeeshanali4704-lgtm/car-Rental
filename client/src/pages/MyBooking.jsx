import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);

  const { axios, currency } = useAppContext();

  const fetchMyBookings = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/booking/user");

      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

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

  const titleVariants = {
    hidden: { y: -30, opacity: 0 },
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

  const cardVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
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
      scale: 0.9,
      transition: { duration: 0.3 },
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: 90 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.03,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const statusVariants = {
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

  const detailsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const detailItemVariants = {
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

  const shimmerVariants = {
    initial: { x: "-100%" },
    hover: {
      x: "100%",
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const borderGlowVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return "✅";
      case "cancelled":
        return "❌";
      case "pending":
        return "⏳";
      default:
        return "📋";
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="px-6 md:px-16 lg:px-24 xl:px-32 py-20 max-w-7xl mx-auto min-h-screen bg-gray-50"
    >
      <motion.div variants={titleVariants} className="relative">
        <Title
          title="My Bookings"
          subTitle="View and manage all your booked rental cars."
          align="left"
        />

        {/* Decorative underline */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mt-2"
        />
      </motion.div>

      <motion.div className="mt-12 space-y-6">
        {/* Booking stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white px-4 py-2 rounded-lg shadow-sm"
            >
              <span className="text-sm text-gray-500">Total Bookings</span>
              <motion.p
                key={bookings.length}
                initial={{ scale: 1.5, color: "#0558FE" }}
                animate={{ scale: 1, color: "#000000" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-2xl font-bold"
              >
                {bookings.length}
              </motion.p>
            </motion.div>
          </div>

          {/* Status filter buttons */}
          <div className="flex gap-2 flex-wrap">
            {["All", "Confirmed", "Pending", "Cancelled"].map((status) => (
              <motion.button
                key={status}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                {status}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isLoading && bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
                layout
                className="relative group"
                onHoverStart={() => setExpandedCard(index)}
                onHoverEnd={() => setExpandedCard(null)}
              >
                {/* Card glow effect */}
                <motion.div
                  variants={borderGlowVariants}
                  initial="initial"
                  animate={expandedCard === index ? "hover" : "initial"}
                  className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-2xl blur-xl opacity-0"
                  style={{ zIndex: -1 }}
                />

                {/* Card shimmer */}
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate={expandedCard === index ? "hover" : "initial"}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl pointer-events-none"
                  style={{ zIndex: 1 }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 bg-white rounded-2xl shadow-md border border-borderColor relative z-10">
                  {/* Car Image */}
                  <motion.div variants={imageVariants} whileHover="hover">
                    <img
                      src={booking.car?.image}
                      alt={booking.car?.model}
                      className="w-full h-52 object-cover rounded-xl"
                    />
                    {/* Image overlay badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full"
                    >
                      #{index + 1}
                    </motion.div>
                  </motion.div>

                  {/* Booking Details */}
                  <motion.div
                    variants={detailsVariants}
                    className="lg:col-span-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <motion.h2
                          className="text-2xl font-bold"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {booking.car?.brand} {booking.car?.model}
                        </motion.h2>

                        <motion.span
                          variants={statusVariants}
                          initial="initial"
                          animate="pulse"
                          className={`px-4 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {getStatusIcon(booking.status)} {booking.status}
                        </motion.span>
                      </div>

                      <motion.p
                        variants={detailItemVariants}
                        className="text-gray-500 mt-1"
                      >
                        {booking.car?.category} • {booking.car?.year}
                      </motion.p>

                      <motion.div
                        variants={detailsVariants}
                        className="grid sm:grid-cols-2 gap-4 mt-6"
                      >
                        <motion.div variants={detailItemVariants}>
                          <p className="text-gray-500 text-sm flex items-center gap-2">
                            <span className="text-primary">🔑</span> Booking ID
                          </p>
                          <motion.p
                            className="font-medium"
                            whileHover={{ color: "#0558FE" }}
                          >
                            #{String(index + 1).padStart(4, "0")}
                          </motion.p>
                        </motion.div>

                        <motion.div variants={detailItemVariants}>
                          <p className="text-gray-500 text-sm flex items-center gap-2">
                            <span className="text-primary">📍</span> Location
                          </p>
                          <p className="font-medium">
                            {booking.car?.location}
                          </p>
                        </motion.div>

                        <motion.div variants={detailItemVariants}>
                          <p className="text-gray-500 text-sm flex items-center gap-2">
                            <span className="text-primary">📅</span> Pick-up Date
                          </p>
                          <motion.p
                            className="font-medium"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {new Date(booking.pickupDate).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </motion.p>
                        </motion.div>

                        <motion.div variants={detailItemVariants}>
                          <p className="text-gray-500 text-sm flex items-center gap-2">
                            <span className="text-primary">↩️</span> Return Date
                          </p>
                          <motion.p
                            className="font-medium"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {new Date(booking.returnDate).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </motion.p>
                        </motion.div>

                        <motion.div
                          variants={detailItemVariants}
                          className="sm:col-span-2"
                        >
                          <p className="text-gray-500 text-sm flex items-center gap-2">
                            <span className="text-primary">💰</span> Total Price
                          </p>
                          <motion.p
                            className="text-primary font-bold text-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {currency}
                            {booking.price.toLocaleString()}
                          </motion.p>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Action buttons */}
                    <motion.div
                      variants={detailItemVariants}
                      className="flex gap-3 mt-6 pt-6 border-t border-gray-100"
                    >
                      {booking.status === "pending" && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                          onClick={() => {
                            // Handle cancellation
                            toast.error("Cancellation feature coming soon!");
                          }}
                        >
                          Cancel Booking
                        </motion.button>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dull transition"
                        onClick={() => {
                          // Handle view details
                          toast.success("Viewing booking details...");
                        }}
                      >
                        View Details
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition"
                        onClick={() => {
                          // Handle download invoice
                          toast.success("Downloading invoice...");
                        }}
                      >
                        📄 Invoice
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))
          ) : !isLoading && bookings.length === 0 ? (
            <motion.div
              key="empty"
              variants={emptyVariants}
              initial="hidden"
              animate="visible"
              className="text-center py-20 bg-white rounded-2xl shadow-sm"
            >
              <motion.div
                variants={emptyIconVariants}
                initial="initial"
                animate="float"
                className="text-6xl mb-6"
              >
                📋
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-semibold"
              >
                No Bookings Found
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-500 mt-2"
              >
                You haven't booked any car yet. Start your journey today!
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = "/cars"}
                className="mt-6 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dull transition shadow-lg"
              >
                Browse Cars 🚗
              </motion.button>
            </motion.div>
          ) : (
            // Loading state
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="bg-white rounded-2xl p-6 shadow-sm"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="h-52 bg-gray-200 rounded-xl animate-pulse" />
                    <div className="lg:col-span-3 space-y-4">
                      <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
                      <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((j) => (
                          <div key={j} className="space-y-2">
                            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                            <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default MyBookings;