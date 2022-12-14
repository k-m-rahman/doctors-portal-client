import React from "react";
import introPic from "../../../assets/images/treatment.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const Intro = () => {
  return (
    <div className="hero  lg:px-20">
      <div className="hero-content  px-8 lg:gap-16 flex-col lg:flex-row">
        <img
          src={introPic}
          className="w-10/12 lg:w-2/5 rounded-lg shadow-2xl"
          alt=""
        />
        <div className="md:w-[95%] mt-5">
          <h1 className="text-5xl text-accent font-bold">
            Exceptional Dental Care, on Your Terms
          </h1>
          <p className="py-6">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsumis that it has a more-or-less normal
            distribution of letters,as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page
          </p>
          <PrimaryButton>Get Started</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Intro;
