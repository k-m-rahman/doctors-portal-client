import React from "react";
import chair from "../../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
  return (
    <header>
      <div className="hero lg:p-10 bg-no-repeat  bg-[url('/src/assets/images/bg.png')]">
        <div className="hero-content flex-col lg:flex-row-reverse gap-5 lg:gap-10">
          <img
            src={chair}
            alt="dentist chair"
            className="w-11/12 lg:w-1/2 rounded-lg shadow-2xl"
          />
          <div>
            {/* calender */}
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(data) => {
                if (data) {
                  setSelectedDate(data);
                }
              }}
            ></DayPicker>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentBanner;
