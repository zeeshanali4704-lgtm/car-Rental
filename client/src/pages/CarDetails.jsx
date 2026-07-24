import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    cars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  } = useAppContext();

  const [car, setCar] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const currency = import.meta.env.VITE_CURRENCY || "$";

  // Mock images for gallery
  const carImages = [
    car?.image,
    car?.image, // In real app, these would be different images
    car?.image,
  ];

  useEffect(() => {
    if (cars.length > 0) {
      const selectedCar = cars.find((item) => item._id === id);
      setCar(selectedCar);
    }
  }, [cars, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsBooking(true);

    try {
      const { data } = await axios.post('/api/booking/create', {
        car: id,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        toast.success(data.message);
        navigate('/my-bookings');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsBooking(false);
    }
  };

  if (!car) {
    return <Loader />;
  }

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

  const backButtonVariants = {
    hidden: { x: -30, opacity: 0 },
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
      x: -5,
      transition: { type: "spring", stiffness: 300 },
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
        duration: 0.8,
      },
    },
  };

  const galleryVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const thumbnailVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      borderColor: "#0558FE",
      transition: { type: "spring", stiffness: 300 },
    },
    selected: {
      borderColor: "#0558FE",
      scale: 1.05,
      boxShadow: "0 0 0 3px rgba(5, 88, 254, 0.3)",
    },
  };

  const titleVariants = {
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

  const infoVariants = {
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

  const featureVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.4 + i * 0.1,
      },
    }),
    hover: {
      y: -5,
      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  const descriptionVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.6,
      },
    },
  };

  const bookingCardVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: 0.3,
      },
    },
  };

  const priceVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.4,
      },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "#0558FE",
      boxShadow: "0 0 0 3px rgba(5, 88, 254, 0.2)",
      transition: { type: "spring", stiffness: 400 },
    },
    hover: {
      scale: 1.01,
      transition: { type: "spring", stiffness: 400 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 30px rgba(5, 88, 254, 0.4)",
      transition: { type: "spring", stiffness: 400 },
    },
    tap: { scale: 0.98 },
    loading: {
      scale: 0.98,
      opacity: 0.8,
      transition: { duration: 0.2 },
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

  const shimmerVariants = {
    initial: { x: "-100%" },
    hover: {
      x: "100%",
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="px-6 md:px-16 lg:px-24 xl:px-32 py-24 min-h-screen bg-gray-50"
    >
      {/* Back Button */}
      <motion.button
        variants={backButtonVariants}
        whileHover="hover"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-primary mb-8 group"
      >
        <motion.img
          src={assets.arrow_icon}
          alt="Back"
          className="w-4 rotate-180"
          whileHover={{ x: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <span className="group-hover:underline">Back to all cars</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <motion.div
            variants={imageVariants}
            className="relative overflow-hidden rounded-2xl shadow-lg"
          >
            <motion.img
              src={carImages[selectedImage]}
              alt={car.model}
              className="w-full h-[400px] object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* Image overlay gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            />

            {/* Availability badge on image */}
            <motion.div
              variants={statusVariants}
              initial="initial"
              animate="pulse"
              className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium ${
                car.isAvaliable
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              } shadow-lg`}
            >
              {car.isAvaliable ? "✓ Available" : "✗ Unavailable"}
            </motion.div>
          </motion.div>

          {/* Thumbnail Gallery */}
          <motion.div
            variants={galleryVariants}
            className="flex gap-3 mt-4"
          >
            {carImages.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`${car.model} ${index + 1}`}
                variants={thumbnailVariants}
                whileHover="hover"
                animate={selectedImage === index ? "selected" : "visible"}
                onClick={() => setSelectedImage(index)}
                className="w-20 h-20 rounded-lg object-cover cursor-pointer border-2 border-transparent"
              />
            ))}
          </motion.div>

          <motion.div variants={titleVariants} className="mt-8">
            <motion.h1
              className="text-4xl font-bold"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {car.brand} {car.model}
            </motion.h1>

            <motion.p
              variants={infoVariants}
              custom={0}
              className="text-gray-500 mt-2 flex items-center gap-2"
            >
              <span className="text-primary">•</span>
              {car.category}
              <span className="text-gray-300">|</span>
              {car.year}
            </motion.p>

            <motion.div
              variants={statusVariants}
              initial="initial"
              animate="pulse"
              className="inline-block mt-4"
            >
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  car.isAvaliable
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {car.isAvaliable
                  ? "Available Now"
                  : "Currently Unavailable"}
              </span>
            </motion.div>

            {/* Features */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-10"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.5,
                  },
                },
              }}
            >
              {[
                { icon: assets.users_icon, label: `${car.seating_capacity} Seats` },
                { icon: assets.fuel_icon, label: car.fuel_type },
                { icon: assets.car_icon, label: car.transmission },
                { icon: assets.location_icon, label: car.location },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={featureVariants}
                  whileHover="hover"
                  className="bg-white rounded-xl p-5 flex flex-col items-center shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <motion.img
                    src={feature.icon}
                    className="w-6 mb-3"
                    alt=""
                    variants={floatVariants}
                    initial="initial"
                    animate="animate"
                  />
                  <p className="text-sm font-medium">{feature.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              variants={descriptionVariants}
              className="mt-10"
            >
              <motion.h2
                className="text-2xl font-semibold"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Description
              </motion.h2>

              <motion.p
                className="mt-4 text-gray-600 leading-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {car.description}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Booking Card */}
        <motion.div
          variants={bookingCardVariants}
          className="lg:col-span-1"
        >
          <motion.form
            onSubmit={handleSubmit}
            className="sticky top-24 bg-white border border-gray-200 rounded-2xl p-6 shadow-lg"
            whileHover={{ boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            {/* Price */}
            <motion.div
              variants={priceVariants}
              className="flex items-baseline gap-1"
            >
              <span className="text-3xl font-bold text-primary">
                {currency}
                {car.pricePerDay}
              </span>
              <span className="text-lg font-normal text-gray-500">
                / day
              </span>
            </motion.div>

            {/* Total price calculation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-2 text-sm text-gray-500"
            >
              {pickupDate && returnDate && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Total:{" "}
                  {currency}
                  {(
                    car.pricePerDay *
                    Math.ceil(
                      (new Date(returnDate) - new Date(pickupDate)) /
                        (1000 * 60 * 60 * 24)
                    ) || 1
                  )}
                </motion.span>
              )}
            </motion.div>

            <div className="mt-6 space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.label
                  className="font-medium block"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Pick-up Date
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
                  className="w-full border rounded-lg mt-2 p-3 outline-primary transition-all duration-300"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.label
                  className="font-medium block"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
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
                  className="w-full border rounded-lg mt-2 p-3 outline-primary transition-all duration-300"
                />
              </motion.div>
            </div>

            {/* Book Now Button */}
            <motion.button
              type="submit"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              animate={isBooking ? "loading" : "initial"}
              disabled={!car.isAvaliable || isBooking}
              className={`w-full mt-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 relative overflow-hidden ${
                car.isAvaliable
                  ? "bg-primary hover:bg-primary-dull"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {/* Button shimmer */}
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                whileHover="hover"
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />

              <motion.span
                className="relative z-10 flex items-center justify-center gap-2"
                animate={isBooking ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {car.isAvaliable ? "Book Now" : "Unavailable"}
                {car.isAvaliable && (
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                )}
              </motion.span>

              {/* Loading spinner */}
              {isBooking && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <svg
                    className="w-6 h-6 text-white animate-spin"
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
              )}
            </motion.button>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500"
            >
              <span className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Secure Booking
              </span>
              <span className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Free Cancellation
              </span>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CarDetails;