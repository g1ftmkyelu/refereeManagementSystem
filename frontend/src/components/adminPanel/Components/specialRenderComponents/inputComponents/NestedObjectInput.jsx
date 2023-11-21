import React from 'react';

const NestedObjectInput = ({ data, onChange, onDelete, onReturnObject }) => {
  const handleEdit = (path, value) => {
    onChange(path, value);
  };

  const handleDelete = path => {
    onDelete(path);
  };

  const renderInput = (path, value) => {
    return (
      <input
        type="text"
        value={value}
        onChange={e => handleEdit(path, e.target.value)}
      />
    );
  };

  const renderComponent = (obj, path = []) => {
    return Object.keys(obj).map(key => {
      const value = obj[key];
      const currentPath = [...path, key];

      if (typeof value === 'object' && value !== null) {
        return (
          <div key={key}>
            <div>{key}:</div>
            {renderComponent(value, currentPath)}
          </div>
        );
      } else {
        return (
          <div key={key}>
            <div>{key}:</div>
            {renderInput(currentPath, value)}
            <button onClick={() => handleDelete(currentPath)}>Delete</button>
          </div>
        );
      }
    });
  };

  return (
    <div>
      {renderComponent(data)}
      <button onClick={onReturnObject}>Return Object</button>
    </div>
  );
};

export default NestedObjectInput;
