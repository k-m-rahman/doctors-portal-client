import React from "react";
import markerIcon from "../../../../assets/icons/marker.svg";
import phoneIcon from "../../../../assets/icons/phone.svg";
import clockIcon from "../../../../assets/icons/clock.svg";
import InfoCard from "./InfoCard/InfoCard";

const InfoCards = () => {
  const cardsData = [
    {
      id: 1,
      title: "Opening Hours",
      description: "Opens from 9am. to 5Pm. everyday",
      icon: clockIcon,
      bgClass: "bg-gradient-to-r from-primary to-secondary",
    },
    {
      id: 2,
      title: "Visit our location",
      description: "Brooklyn, NY 10036, United States",
      icon: markerIcon,
      bgClass: "bg-accent",
    },
    {
      id: 3,
      title: "Contact us now",
      description: "+000 123 456789",
      icon: phoneIcon,
      bgClass: "bg-gradient-to-r from-primary to-secondary",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardsData.map((card) => (
        <InfoCard key={card.id} card={card}></InfoCard>
      ))}
    </div>
  );
};

export default InfoCards;
