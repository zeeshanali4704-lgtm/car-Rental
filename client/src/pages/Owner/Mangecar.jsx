import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function ManageCar() {
  const { isOwner, axios, currency } = useAppContext();

  const [cars, setCars] = useState([]);

  // Fetch Cars
  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");

      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Toggle Availability
  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", {
        carId,
      });

      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Delete Car
  const deleteCar = async (carId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (!confirmDelete) return;

    try {
      const { data } = await axios.post("/api/owner/delete-car", {
        carId,
      });

      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchOwnerCars();
    }
  }, [isOwner]);

  return (
    <div className="flex-1 px-4 md:px-10 py-10">
      <Title
        title="Manage Cars"
        subTitle="View, edit and manage all your listed vehicles."
      />

      <div className="mt-8 overflow-x-auto bg-white rounded-xl shadow border border-borderColor">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4">Car</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price / Day</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4 text-center">Availability</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car) => (
              <tr key={car._id} className="border-b">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={car.image}
                      alt={car.brand}
                      className="w-20 h-14 rounded object-cover"
                    />

                    <div>
                      <h3 className="font-semibold">
                        {car.brand} {car.model}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {car.year}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">{car.category}</td>

                <td className="px-6 py-4">
                  {currency}
                  {car.pricePerDay}
                </td>

                <td className="px-6 py-4">{car.location}</td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => toggleAvailability(car._id)}
                    className={`px-3 py-1 rounded text-white ${
                      car.isAvaliable
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {car.isAvaliable
                      ? "Available"
                      : "Unavailable"}
                  </button>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <button>
                      <img
                        src={assets.edit_icon}
                        alt="Edit"
                        className="w-5"
                      />
                    </button>

                    <button
                      onClick={() => deleteCar(car._id)}
                    >
                      <img
                        src={assets.delete_icon}
                        alt="Delete"
                        className="w-5"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {cars.length === 0 && (
          <div className="text-center py-10">
            No Cars Found
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageCar;