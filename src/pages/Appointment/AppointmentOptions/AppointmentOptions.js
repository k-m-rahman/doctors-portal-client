import React, { useState } from "react";
import { format } from "date-fns";
import AppointmentOption from "./AppointmentOption/AppointmentOption";
import BookingModal from "./BookingModal/BookingModal";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/spinner/Spinner";

const AppointmentOptions = ({ selectedDate }) => {
  // const [appointmentOptions, setAppointmentOptions] = useState(null);
  const [treatment, setTreatment] = useState(null);
  const date = format(selectedDate, "PP");

  // fetching the data with react query
  const {
    data: appointmentOptions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: () =>
      fetch(
        `https://doctor-portal-server-side-three.vercel.app/v2/appointmentOptions?date=${date}`
      ).then((res) => res.json()),
  });

  // useEffect(() => {
  //   fetch("https://doctor-portal-server-side-three.vercel.app/appointmentOptions")
  //     .then((res) => res.json())
  //     .then((data) => setAppointmentOptions(data));
  // }, []);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="text-center mt-16">
      <p className="text-xl text-secondary font-bold ">
        Available Appointments on{" "}
        <span className="block md:inline">{format(selectedDate, "PP")}</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 my-16">
        {appointmentOptions?.map((option) => (
          <AppointmentOption
            key={option._id}
            appointmentOption={option}
            setTreatment={setTreatment}
          ></AppointmentOption>
        ))}
      </div>
      {treatment && (
        <BookingModal
          selectedDate={selectedDate}
          treatment={treatment}
          setTreatment={setTreatment}
          refetch={refetch}
        ></BookingModal>
      )}
    </div>
  );
};

export default AppointmentOptions;
