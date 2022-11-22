import React from "react";

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
  const { name, slots, price } = appointmentOption;
  const openModal = () => {
    setTreatment(appointmentOption);
  };
  return (
    <div className="card  shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-semibold  text-secondary text-center">
          {name}
        </h2>
        <div className="text-accent font-medium text-sm flex-col flex gap-1 my-1">
          <p className="text-accent font-medium text-sm">
            {slots.length > 0 ? slots[0] : "Try Another Day"}
          </p>
          <p className="uppercase">
            {slots.length} {slots.length > 1 ? "slots" : "slot"} AVAILABLE
          </p>
          <p className="text-sm text-amber-500"> Price: ${price} </p>
        </div>

        <div className="card-actions justify-center">
          <label
            className="btn bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-[#03B8D7] hover:to-[#04C8A4] text-white font-bold border-none"
            htmlFor="booking-modal"
            onClick={openModal}
            disabled={slots.length === 0}
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
