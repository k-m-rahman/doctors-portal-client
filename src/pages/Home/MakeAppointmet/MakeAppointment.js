import React from "react";
import appointment from "../../../assets/images/appointment.png";
import doctor from "../../../assets/images/doctor.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const MakeAppointment = () => {
  return (
    <section className="mt-16">
      <div className="hero ">
        <div className="hero-content pb-0 bg-[url('/src/assets/images/appointment.png')] flex-col lg:flex-row">
          <img
            src={doctor}
            className="lg:w-1/2 hidden lg:block  -mt-28 rounded-lg "
            alt=""
          />
          <div className="text-white px-7 py-16">
            <p className="text-primary text-xl font-bold">Appointment</p>
            <h1 className="text-4xl font-semibold mt-5">
              Make an appointment Today
            </h1>
            <p className="py-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop
              publishing packages and web page
            </p>
            <PrimaryButton>Make Appointment</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakeAppointment;
