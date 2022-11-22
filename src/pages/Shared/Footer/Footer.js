import React from "react";

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <footer className=" p-10 bg-[url('/src/assets/images/footer-bg 1 1.png')] text-center mt-20 flex flex-col gap-5">
      <div className="footer  ">
        <div>
          {/* services */}
          <span className="footer-title">Services</span>
          <a href="/" className="link link-hover">
            Emergency Checkup
          </a>
          <a href="/" className="link link-hover">
            Monthly Checkup
          </a>
          <a href="/" className="link link-hover">
            Weekly Checkup
          </a>
          <a href="/" className="link link-hover">
            Deep Checkup
          </a>
        </div>
        <div>
          <span className="footer-title">ORAL HEALTH</span>
          <a href="/" className="link link-hover">
            Fluoride Treatment
          </a>
          <a href="/" className="link link-hover">
            Cavity Filling
          </a>
          <a href="/" className="link link-hover">
            Teeth Whitening
          </a>
        </div>
        <div>
          <span className="footer-title">OUR ADDRESS</span>
          <a href="/" className="link link-hover">
            New York - 101010 Hudson
          </a>
        </div>
      </div>
      <div>
        <h4>{`Copyright ${currentYear} All Rights Reserved`}</h4>
      </div>
    </footer>
  );
};

export default Footer;
