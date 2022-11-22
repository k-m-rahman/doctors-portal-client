import React from "react";

const PrimaryButton = ({ children }) => {
  return (
    <button className="btn bg-gradient-to-r from-primary to-secondary hover:bg-gradient-to-r hover:from-[#03B8D7] hover:to-[#04C8A4] text-white font-bold border-none">
      {children}
    </button>
  );
};

export default PrimaryButton;
