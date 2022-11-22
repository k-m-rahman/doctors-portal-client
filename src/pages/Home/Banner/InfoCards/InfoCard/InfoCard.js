import React from "react";

const InfoCard = ({ card }) => {
  const { icon, title, description, bgClass } = card;
  return (
    <div
      className={`flex flex-col md:flex-row gap-5 justify-center items-center ${bgClass} p-5 rounded-lg text-white`}
    >
      <span className="w-1/5 flex justify-center items-center  ">
        {" "}
        <img src={icon} alt="" />
      </span>
      <span className="w-4/5">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm">{description}</p>
      </span>
    </div>
  );
};

export default InfoCard;
