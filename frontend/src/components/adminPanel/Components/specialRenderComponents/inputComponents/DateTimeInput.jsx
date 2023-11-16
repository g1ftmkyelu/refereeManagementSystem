import React from "react";



const DateTimeInput = ({ name, title, handleInputChange, formData }) => (
  <div key={name}>
    <label htmlFor={name}>{title}</label>
    <input
      type="datetime-local"
      id={name}
      name={name}
      onChange={(e) => handleInputChange(e, name)}
      required
      value={formData[name] ? formData[name].toLocaleString() : ""}
    />
  </div>
);

export default DateTimeInput;
