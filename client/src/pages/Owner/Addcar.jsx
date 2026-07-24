import React, { useState,useContext } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";


function Addcar() {

      const { axios, currency } = useContext(AppContext);

  const [image, setImage] = useState(null);

  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    location: "",
    description: "",
  });

  const [isLoading,setIsLoading] = useState(false)
const onSubmitHandler = async (e) => {
  e.preventDefault();

  if (isLoading) return;

  setIsLoading(true);

  try {
    const formData = new FormData();

    formData.append("image", image);
    formData.append("carData", JSON.stringify(car));

    const { data } = await axios.post("/api/owner/add-car", formData);

    if (data.success) {
      toast.success(data.message);

      setImage(null);

      setCar({
        brand: "",
        model: "",
        year: "",
        pricePerDay: "",
        category: "",
        transmission: "",
        fuel_type: "",
        seating_capacity: "",
        location: "",
        description: "",
      });
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 mt-8 max-w-3xl text-sm"
      >
        {/* Upload Image */}
        <div>
          <label htmlFor="car-image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : assets.upload_icon
              }
              alt=""
              className="h-20 cursor-pointer"
            />

            <input
              id="car-image"
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          <p className="text-gray-500 mt-2">
            Upload Car Image
          </p>
        </div>

        {/* Brand & Model */}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label>Brand</label>

            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={car.brand}
              onChange={(e) =>
                setCar({ ...car, brand: e.target.value })
              }
            />
          </div>

          <div>
            <label>Model</label>

            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={car.model}
              onChange={(e) =>
                setCar({ ...car, model: e.target.value })
              }
            />
          </div>
        </div>

        {/* Year Price Category */}

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label>Year</label>

            <input
              type="number"
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={car.year}
              onChange={(e) =>
                setCar({ ...car, year: e.target.value })
              }
            />
          </div>

          <div>
            <label>Price / Day ({currency})</label>

            <input
              type="number"
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={car.pricePerDay}
              onChange={(e) =>
                setCar({
                  ...car,
                  pricePerDay: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Category</label>

            <select
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={car.category}
              onChange={(e) =>
                setCar({
                  ...car,
                  category: e.target.value,
                })
              }
            >
              <option value="">Select</option>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Van</option>
            </select>
          </div>
        </div>

        {/* Transmission Fuel Seats */}

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label>Transmission</label>

            <select
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={car.transmission}
              onChange={(e) =>
                setCar({
                  ...car,
                  transmission: e.target.value,
                })
              }
            >
              <option value="">Select</option>
              <option>Automatic</option>
              <option>Manual</option>
              <option>Semi-Automatic</option>
            </select>
          </div>

          <div>
            <label>Fuel Type</label>

            <select
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={car.fuel_type}
              onChange={(e) =>
                setCar({
                  ...car,
                  fuel_type: e.target.value,
                })
              }
            >
              <option value="">Select</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Gas</option>
              <option>Hybrid</option>
              <option>Electric</option>
            </select>
          </div>

          <div>
            <label>Seats</label>

            <input
              type="number"
              className="w-full border rounded-md px-3 py-2 mt-1"
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({
                  ...car,
                  seating_capacity: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Location */}

        <div>
          <label>Location</label>

          <select
            className="w-full border rounded-md px-3 py-2 mt-1"
            value={car.location}
            onChange={(e) =>
              setCar({
                ...car,
                location: e.target.value,
              })
            }
          >
            <option value="">Select Location</option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Houston</option>
            <option>Chicago</option>
          </select>
        </div>

        {/* Description */}

        <div>
          <label>Description</label>

          <textarea
            rows="5"
            className="w-full border rounded-md px-3 py-2 mt-1"
            value={car.description}
            onChange={(e) =>
              setCar({
                ...car,
                description: e.target.value,
              })
            }
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md w-fit"
        >
          <img src={assets.tick_icon} alt="" />
      {isLoading ? 'Listing...' : '    List Your Car'}
        </button>
      </form>
    </div>
  );
}

export default Addcar;