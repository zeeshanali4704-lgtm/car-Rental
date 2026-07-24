import React from "react";
import { assets } from "../assets/assets";

function Loader() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center">

        <img
          src={assets.logo}
          alt="Logo"
          className="w-24 mb-6 animate-pulse"
        />

        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-5 text-gray-500">
          Please wait...
        </p>

      </div>
    </div>
  );
}

export default Loader;