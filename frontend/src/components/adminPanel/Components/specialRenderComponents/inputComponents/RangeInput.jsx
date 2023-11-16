import React from "react";




const RangeInput = ({ name, title, handleInputChange }) => (
  <div key={name}>
    <label htmlFor={name}>{title}</label>
    <input
      type="range"
      id={name}
      name={name}
      min="0"
      max="100"
      step="1"
      onChange={(e) => handleInputChange(e, name)}
      required
    />
  </div>
);

export default RangeInput;
