import React, { useState } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const {
    setShowLogin,
    user,
    logout,
    isOwner,
    axios,
    setIsOwner,
  } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isChangingRole, setIsChangingRole] = useState(false);

  const changeRole = async () => {
    setIsChangingRole(true);
    try {
      const { data } = await axios.post("/api/owner/change-role");

      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
        navigate("/owner");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsChangingRole(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  // Animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      rotate: -5,
      transition: { type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.95 },
  };

  const menuItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    }),
    hover: {
      scale: 1.05,
      color: "#var(--primary-color)",
      transition: { type: "spring", stiffness: 400 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      transition: { type: "spring", stiffness: 400 },
    },
    tap: { scale: 0.95 },
  };

  const mobileMenuVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.3 },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.3 },
    },
  };

  const mobileItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  const searchVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
      transition: { type: "spring", stiffness: 400 },
    },
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed top-0 left-0 w-full z-50 border-b border-borderColor transition-all duration-300 ${
        location.pathname === "/"
          ? "bg-white/80 backdrop-blur-md"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo with animation */}
        <motion.div
          variants={logoVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Link to="/" onClick={() => setOpen(false)}>
            <img src={assets.logo} alt="Logo" className="h-9" />
          </Link>
        </motion.div>

        {/* Desktop Menu with staggered animations */}
        <nav className="hidden md:flex items-center gap-8">
          {menuLinks.map((link, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={menuItemVariants}
              whileHover="hover"
            >
              <Link
                to={link.path}
                className={`font-medium transition-all duration-300 hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Search with focus animation */}
        <motion.form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center gap-2 border border-borderColor rounded-full px-4 py-2 w-64"
          whileFocus="focus"
          variants={searchVariants}
        >
          <input
            type="text"
            placeholder="Search cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-sm"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={assets.search_icon}
              alt="Search"
              className="w-4 h-4 cursor-pointer"
            />
          </motion.button>
        </motion.form>

        {/* Desktop Buttons with animations */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            className="font-medium hover:text-primary transition disabled:opacity-50"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={isChangingRole}
          >
            {isOwner ? "Dashboard" : isChangingRole ? "Loading..." : "List Cars"}
          </motion.button>

          <motion.button
            onClick={() => {
              if (user) {
                logout();
              } else {
                setShowLogin(true);
              }
            }}
            className="px-6 py-2 rounded-lg bg-primary hover:bg-primary-dull transition text-white"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {user ? "Logout" : "Login"}
          </motion.button>
        </div>

        {/* Mobile Menu Button with animation */}
        <motion.button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <img
            src={open ? assets.close_icon : assets.menu_icon}
            alt="Menu"
            className="w-6"
          />
        </motion.button>
      </div>

      {/* Mobile Menu with AnimatePresence for exit animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-16 right-0 w-full h-screen bg-white md:hidden overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-6">
              {/* Mobile Links with staggered animations */}
              {menuLinks.map((link, index) => (
                <motion.div
                  key={index}
                  variants={mobileItemVariants}
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-medium ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-gray-700"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Search */}
              <motion.form
                onSubmit={handleSearch}
                variants={mobileItemVariants}
                className="flex items-center gap-2 border border-borderColor rounded-full px-4 py-2"
              >
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <img
                    src={assets.search_icon}
                    alt="Search"
                    className="w-4 h-4"
                  />
                </motion.button>
              </motion.form>

              {/* Mobile Dashboard Button */}
              <motion.button
                variants={mobileItemVariants}
                whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (isOwner) {
                    navigate("/owner");
                  } else {
                    changeRole();
                  }
                  setOpen(false);
                }}
                className="py-3 border border-primary text-primary rounded-lg disabled:opacity-50"
                disabled={isChangingRole}
              >
                {isOwner ? "Dashboard" : isChangingRole ? "Loading..." : "List Cars"}
              </motion.button>

              {/* Mobile Login/Logout Button */}
              <motion.button
                variants={mobileItemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (user) {
                    logout();
                  } else {
                    setShowLogin(true);
                  }
                  setOpen(false);
                }}
                className="py-3 bg-primary hover:bg-primary-dull text-white rounded-lg transition"
              >
                {user ? "Logout" : "Login"}
              </motion.button>

              {/* Animated decorative element */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="h-1 w-20 bg-primary rounded-full mx-auto mt-4"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;