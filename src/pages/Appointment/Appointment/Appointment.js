import React, { useState } from "react";
import AppointmentBanner from "../AppointmentBanner/AppointmentBanner";
import AppointmentOptions from "../AppointmentOptions/AppointmentOptions";

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div>
      <AppointmentBanner
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      ></AppointmentBanner>
      <AppointmentOptions selectedDate={selectedDate}></AppointmentOptions>
    </div>
  );
};

export default Appointment;
