import React from "react";
import chair from "../../../assets/images/chair.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import InfoCards from "./InfoCards/InfoCards";

const Banner = () => {
  return (
    <div className="px-5 ">
      <div className="hero  flex flex-col md:gap-20 bg-[url('/src/assets/images/bg.png')] ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={chair} className="lg:w-1/2 rounded-lg shadow-2xl" alt="" />
          <div>
            <h1 className="text-5xl text-accent font-bold">
              Your New Smile Starts Here
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <PrimaryButton>Get Started</PrimaryButton>
          </div>
        </div>
        <div className="w-full">
          <InfoCards></InfoCards>
        </div>
      </div>
    </div>
  );
};

export default Banner;
