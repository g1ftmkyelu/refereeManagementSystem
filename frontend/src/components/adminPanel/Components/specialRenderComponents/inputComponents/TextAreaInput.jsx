import React, { useState } from "react";
import { FaEdit, FaSave } from 'react-icons/fa'; // Import the edit and save icons

const TextAreaInput = ({ name, title, formData, handleInputChange }) => {
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
          <textarea
            id={name}
            name={name}
            value={formData[name] || ""}
            onChange={(e) => handleInputChange(e, name)}
            required
          />
          <button onClick={handleToggleEdit} className="edit-button">
            <FaSave />
            Save
          </button>
        </div>
      ) : (
        // Display mode
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>{formData[name] || ""}</div>
          <button onClick={handleToggleEdit} className="edit-button">
            <FaEdit />
          </button>
        </div>
      )}
    </div>
  );
};

export default TextAreaInput;
