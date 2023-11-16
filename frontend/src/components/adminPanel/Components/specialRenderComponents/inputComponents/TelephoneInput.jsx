import React from "react";




const TelephoneInput = ({ name, title, formData, handleInputChange }) => (
  <div key={name}>
    <label htmlFor={name}>{title}</label>
    <input
      type="tel"
      id={name}
      name={name}
      value={formData[name] || ""}
      onChange={(e) => handleInputChange(e, name)}
      required
    />
  </div>
);

export default TelephoneInput;
