import React, { useState } from "react";
import ReactQuill from "react-quill";
import { FaEdit, FaSave } from 'react-icons/fa'; // Import the edit and save icons

import "react-quill/dist/quill.snow.css";

const RichTextAreaInput = ({ name, title, formData, handleInputChange }) => {
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [editedContent, setEditedContent] = useState(formData[name] || ""); // State to track edited content

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    handleInputChange(editedContent, name);
    setIsEditing(false);
  };

  return (
    <div key={name}>
      <label htmlFor={name}><b>{title}</b></label><br />
      {isEditing ? (
        // Edit mode
        <div>
          <ReactQuill
            id={name}
            name={name}
            theme="snow"
            value={editedContent}
            onChange={setEditedContent}
          />
          <button onClick={handleSave} className="edit-button">
            <FaSave />
            Save
          </button>
        </div>
      ) : (
        // Display mode
        <div>
          <div dangerouslySetInnerHTML={{ __html: formData[name] || "" }} />
          <button onClick={handleToggleEdit} className="edit-button">
            <FaEdit />
          </button>
        </div>
      )}
    </div>
  );
};

export default RichTextAreaInput;
