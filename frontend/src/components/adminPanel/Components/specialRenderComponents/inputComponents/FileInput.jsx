import React from "react";



const FileInput = ({
  setUpdateMode,
  updateMode,
  name,
  title,
  handleInputChange,
  formData,
}) => (
  <div>
    <label onClick={() => setUpdateMode(!updateMode)}>
      {updateMode ? "display" : "Update"}
    </label>

    {/* Your form fields */}
    <div key={name}>
      <label htmlFor={name}>{title}</label>

      {updateMode ? (
        <input
          type="file"
          id={name}
          name={name}
          onChange={(e) => handleInputChange(e, name)}
          required
        />
      ) : (
        <img src={formData[name] || ""} alt={title} />
      )}
    </div>
  </div>
);

export default FileInput;
