import React from "react";
import Banner from "./Banner/Banner";
import ContactUs from "./ContactUs/ContactUs";
import Intro from "./Intro/Intro";
import MakeAppointment from "./MakeAppointmet/MakeAppointment";
import Reviews from "./Reviews/Reviews";
import Services from "./Services/Services";

const Home = () => {
  return (
    <div className="flex flex-col gap-20">
      <Banner></Banner>
      <Services></Services>
      <Intro></Intro>
      <MakeAppointment></MakeAppointment>
      <Reviews></Reviews>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
