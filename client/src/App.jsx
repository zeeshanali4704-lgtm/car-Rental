import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import {Toaster} from 'react-hot-toast'

// Pages
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import MyBookings from "./pages/MyBooking";

// Owner Pages
import Layout from "./pages/Owner/Layout";
import DashBoard from "./pages/Owner/DashBoard";
import Addcar from "./pages/Owner/Addcar";
import Mangecar from "./pages/Owner/Mangecar";
import Mangebooking from "./pages/Owner/Mangebooking";
import { useAppContext } from "./context/AppContext";

function App() {

const {showLogin} = useAppContext()
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");

  return (
    <>
    <Toaster/>
      {/* Login Popup */}
      {showLogin && (
        <Login  />
      )}

      {/* Navbar */}
      {!isOwnerPath && (
        <Navbar  />
      )}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cars" element={<Cars />} />

        <Route path="/car-details/:id" element={<CarDetails />} />

        <Route path="/my-bookings" element={<MyBookings />} />

        {/* Owner Dashboard */}
        <Route path="/owner" element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path="add-car" element={<Addcar />} />
          <Route path="manage-cars" element={<Mangecar />} />
          <Route path="manage-bookings" element={<Mangebooking />} />
        </Route>
      </Routes>

      {/* Footer */}
      {!isOwnerPath && <Footer />}
    </>
  );
}

export default App;