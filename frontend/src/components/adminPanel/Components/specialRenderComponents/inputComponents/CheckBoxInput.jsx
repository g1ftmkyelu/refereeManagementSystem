import React from "react";





const CheckBoxInput = ({ name, title, field, handleInputChange }) => (
  <div key={name}>
    <label>{title}</label>
    {field.options.map((option) => (
      <div key={option.value}>
        <input
          type="checkbox"
          id={option.value}
          name={name}
          value={option.value}
          onChange={(e) => handleInputChange(e, name)}
          required
        />
        <label htmlFor={option.value}>{option.label}</label>
      </div>
    ))}
  </div>
);

export default CheckBoxInput;
