import React, { useState } from "react";
import { FaEdit, FaSave } from 'react-icons/fa'; // Import the edit and save icons

const DateInput = ({ name, title, handleInputChange, formData }) => {
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div key={name}>
      <label htmlFor={name}><b>{title}</b></label><br />
      {isEditing ? (
        // Edit mode
        <div>
          <input
            type="date"
            id={name}
            name={name}
            onChange={(e) => handleInputChange(e, name)}
            required
            value={formData[name] ? formData[name].toLocaleString() : ""}
          />
          <button onClick={handleToggleEdit} className="edit-button">
            <FaSave />
            Save
          </button>
        </div>
      ) : (
        // Display mode
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>{formData[name] ? formData[name].toLocaleString() : ""}</div>
          <button onClick={handleToggleEdit} className="edit-button">
            <FaEdit />
          </button>
        </div>
      )}
    </div>
  );
};

export default DateInput;
