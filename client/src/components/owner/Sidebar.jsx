import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();

  const [image, setImage] = useState(null);

  const updateImage = async () => {
    if (!image) return;

    try {
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post(
        "/api/owner/update-image",
        formData
      );

      if (data.success) {
        await fetchUser();
        toast.success(data.message);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <aside className="relative min-h-screen w-full max-w-16 md:max-w-64 border-r border-borderColor bg-white flex flex-col items-center pt-8">

      {/* Profile */}
      <div className="relative group">
        <label htmlFor="profile-image" className="cursor-pointer">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=300"
            }
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-primary"
          />

          <input
            id="profile-image"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/40 rounded-full">
            <img
              src={assets.edit_icon}
              alt="Edit"
              className="w-5"
            />
          </div>
        </label>

        {image && (
          <button
            onClick={updateImage}
            className="absolute -right-2 -top-2 bg-primary text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow"
          >
            Save
            <img
              src={assets.check_icon}
              alt="Save"
              className="w-3"
            />
          </button>
        )}
      </div>

      {/* User */}
      <h3 className="mt-4 text-lg font-semibold hidden md:block">
        {user?.name}
      </h3>

      <p className="text-gray-500 text-sm hidden md:block">
        Owner
      </p>

      {/* Navigation */}
      <nav className="w-full mt-8">
        {ownerMenuLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-5 py-3 transition-all ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? link.coloredIcon : link.icon}
                  alt={link.name}
                  className="w-6"
                />

                <span className="hidden md:block">
                  {link.name}
                </span>

                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;