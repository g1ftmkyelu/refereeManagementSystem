import React from "react";
import { CircleLoader, MoonLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <MoonLoader color="#1400ff" />
    </div>
  );
};

export default Loader;
