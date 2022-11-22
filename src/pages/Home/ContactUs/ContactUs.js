import React from "react";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const ContactUs = () => {
  return (
    <div className="hero bg-[url('/src/assets/images/appointment.png')]">
      <div className="hero-content  text-center">
        <div className="max-w-md ">
          <div className="card lg:w-96 my-16   ">
            <div className="card-body gap-5">
              <p className="text-primary text-xl font-bold">Contact Us</p>
              <h4 className="text-3xl font-semibold text-white">
                Stay connected with us
              </h4>
              <div className="form-control">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Subject"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <textarea
                  rows="6"
                  type="text"
                  placeholder="Your message"
                  className="input min-h-[136px] input-bordered"
                />
              </div>

              <div className="form-control mt-6">
                <span className=" max-w-fit mx-auto">
                  <PrimaryButton>Submit</PrimaryButton>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
