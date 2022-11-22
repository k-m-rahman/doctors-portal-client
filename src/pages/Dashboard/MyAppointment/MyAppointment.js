import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const MyAppointment = () => {
  const { user, logOut } = useContext(AuthContext);

  const location = useLocation();

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://doctor-portal-server-side-three.vercel.app/bookings?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  // eta ami nije korsi .. chaile useToken er vitore oo logout koraya felte partam
  if (bookings.message === "forbidden access") {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));

    // eita mone hoy na korleo cholbe .cz logout toh hoye ee jaitese ..
    return (
      <h2 className="text-3xl font-semibold my-5">
        Please{" "}
        <Link className="text-sky-400" to={`/login`} state={{ from: location }}>
          login
        </Link>{" "}
        again to see your appointments
      </h2>
    );
  }
  return (
    <div className="px-5">
      <h3 className="text-3xl font-semibold my-5">My Appointment</h3>

      <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr key={booking._id}>
                <th>{idx + 1}</th>
                <td>{booking.patient}</td>
                <td>{booking.treatment}</td>
                <td>{booking.appointmentDate}</td>
                <td>{booking.slot}</td>
                <td>
                  {booking.price && !booking.paid && (
                    <Link to={`/dashboard/payment/${booking._id}`}>
                      <button className="btn btn-success btn-sm">Pay</button>
                    </Link>
                  )}
                  {booking.price && booking.paid && (
                    <span className="text-primary font-semibold">Paid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
