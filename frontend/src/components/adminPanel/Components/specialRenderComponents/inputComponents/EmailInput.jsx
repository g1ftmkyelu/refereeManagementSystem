import React from "react";







const EmailInput = ({ name, title, formData, handleInputChange }) => (
  <div key={name}>
    <label htmlFor={name}>{title}</label>
    <input
      type="email"
      id={name}
      name={name}
      value={formData[name] || ""}
      onChange={(e) => handleInputChange(e, name)}
      required
    />
  </div>
);

export default EmailInput;
