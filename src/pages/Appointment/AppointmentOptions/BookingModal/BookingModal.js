import React, { useContext } from "react";
import { format } from "date-fns";
import { AuthContext } from "../../../../contexts/AuthProvider";
import toast from "react-hot-toast";

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
  const { name, slots, price } = treatment;
  const date = format(selectedDate, "PP");
  const { user } = useContext(AuthContext);
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const fullName = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const slot = form.slot.value;
    const booking = {
      patient: fullName,
      phone,
      email,
      slot,
      appointmentDate: date,
      treatment: name,
      price,
    };

    // sending the booking info to the server
    fetch("https://doctor-portal-server-side-three.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Booking confirmed");
          setTreatment(null);
          refetch();
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-start">{name}</h3>
          {/* form */}
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            {/* date */}
            <input
              type="text"
              defaultValue={date}
              disabled
              className="input input-bordered w-full "
            />
            {/* options of time */}
            <select name="slot" className="select select-bordered w-full ">
              {slots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>

            {/* Personal Infos */}

            {/* FullName */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              defaultValue={user?.displayName}
              className="input input-bordered w-full "
            />
            {/* Phone Number */}
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full "
            />
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full "
            />
            <input className="btn btn-accent" type="submit" value="submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
