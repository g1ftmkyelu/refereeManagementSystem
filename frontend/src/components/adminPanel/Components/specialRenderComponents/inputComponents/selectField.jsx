import React from 'react';

const SelectFieldAlt = ({ title, value, onChange, data }) => {
    console.log(data);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 p-3 w-full rounded-md mb-4"
      required
    >
      <option value="">{title}</option>
      {data.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default SelectFieldAlt;
