import React from "react";
import fluoride from "../../../assets/images/fluoride.png";
import cavity from "../../../assets/images/cavity.png";
import whitening from "../../../assets/images/whitening.png";
import ServiceCard from "./Servicecard/ServiceCard";

const Services = () => {
  const servicesData = [
    {
      id: 1,
      title: "Fluoride Treatment",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, impedit!",
      icon: fluoride,
    },
    {
      id: 2,
      title: "Cavity Filling",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, impedit!",
      icon: cavity,
    },
    {
      id: 3,
      title: "Teeth Whitening",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. At, impedit!",
      icon: whitening,
    },
  ];
  return (
    <div className="text-center">
      <h4 className="uppercase text-primary font-bold text-xl">our services</h4>
      <p className="text-4xl text-accent">Services We Provide</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-7 mt-10">
        {servicesData.map((service) => (
          <ServiceCard key={service.id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
