
import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

function CarCard({ car }) {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  return (
 <div
  onClick={() => {
    navigate(`/car-details/${car._id}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  className="group rounded-xl overflow-hidden shadow-lg bg-white hover:-translate-y-1 transition-all duration-500 cursor-pointer"
>
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {car.isAvailable && (
          <p className="absolute top-4 left-4 bg-primary/90 text-white text-xs px-3 py-1 rounded-full">
            Available Now
          </p>
        )}

        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
          <span className="font-semibold">
            {currency} {car.pricePerDay}
          </span>
          <span className="text-sm text-white/80"> / day</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div>
          <h3 className="text-xl font-semibold">
            {car.brand} {car.model}
          </h3>

          <p className="text-gray-500 text-sm">
            {car.category} • {car.year}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <img src={assets.users_icon} alt="" className="w-4 h-4" />
            <span>{car.seating_capacity} Seats</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.fuel_icon} alt="" className="w-4 h-4" />
            <span>{car.fuel_type}</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.car_icon} alt="" className="w-4 h-4" />
            <span>{car.transmission}</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.location_icon} alt="" className="w-4 h-4" />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarCard;