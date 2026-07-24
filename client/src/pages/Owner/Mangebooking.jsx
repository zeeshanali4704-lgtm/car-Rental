import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

function ManageBooking() {
  const [bookings, setBookings] = useState([]);
  const { currency, axios } = useAppContext();

  // Fetch Owner Bookings
  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/owner");

      if (data.success) {
        setBookings(data.bookings || data.booking);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Change Booking Status
  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/booking/change-status", {
        bookingId,
        status,
      });

      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="flex-1 px-4 md:px-10 py-10">
      <Title
        title="Manage Bookings"
        subTitle="View and manage all customer bookings."
      />

      <div className="mt-8 overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-5 py-4 text-left">Car</th>
              <th className="px-5 py-4 text-left">Pickup Date</th>
              <th className="px-5 py-4 text-left">Return Date</th>
              <th className="px-5 py-4 text-left">Total</th>
              <th className="px-5 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                {/* Car */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={booking.car?.image}
                      alt=""
                      className="w-16 h-12 rounded-md object-cover"
                    />

                    <div>
                      <p className="font-semibold">
                        {booking.car?.brand} {booking.car?.model}
                      </p>

                      <p className="text-xs text-gray-500">
                        {booking.car?.location}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Pickup */}
                <td className="px-5 py-4">
                  {new Date(booking.pickupDate).toLocaleDateString()}
                </td>

                {/* Return */}
                <td className="px-5 py-4">
                  {new Date(booking.returnDate).toLocaleDateString()}
                </td>

                {/* Total */}
                <td className="px-5 py-4 font-semibold">
                  {currency}
                  {booking.price}
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  {booking.status === "confirmed" ? (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Confirmed
                    </span>
                  ) : (
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        changeBookingStatus(
                          booking._id,
                          e.target.value
                        )
                      }
                      className="border rounded-md px-3 py-2 outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookings.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No bookings found.
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageBooking;