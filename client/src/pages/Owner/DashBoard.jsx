import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
   
  const {axios,isOwner,currency} = useAppContext()

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

const fetchDashboardData = async () => {
  try {
    const { data } = await axios.get("/api/owner/dashboard");

    if (data.success) {
      setData(data.dashboardData);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};
useEffect(() => {
  if (isOwner) {
    fetchDashboardData();
  }
}, [isOwner]);

  const dashboardCards = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icon: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icon: assets.listIconColored,
    },
    {
      title: "Pending",
      value: data.pendingBookings,
      icon: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icon: assets.listIconColored,
    },
  ];

  return (
    <div className="flex-1 px-6 md:px-10 py-10">
      <Title
        title="Admin Dashboard"
        subTitle="Monitor overall platform performance including total cars, bookings, revenue and recent activities."
        align="left"
      />

      {/* Dashboard Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="bg-white border border-borderColor rounded-xl p-5 shadow-sm hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
              </div>

              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <img src={card.icon} alt="" className="w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-3 gap-8 mt-10">

        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white border border-borderColor rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
          <p className="text-gray-500 mb-6">
            Latest customer bookings
          </p>

          <div className="space-y-5">
            {data.recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex items-center justify-between border-b border-gray-100 pb-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <img
                      src={assets.listIconColored}
                      alt=""
                      className="w-5"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {booking.car.brand} {booking.car.model}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {booking.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    {currency}
                    {booking.price}
                  </p>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white border border-borderColor rounded-xl p-6 shadow-sm flex flex-col justify-center">
          <p className="text-gray-500">Monthly Revenue</p>

          <h1 className="text-4xl font-bold text-primary mt-3">
            {currency}
            {data.monthlyRevenue}
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Revenue generated this month.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;