import React, { useState } from 'react';
import NestedObjectInput from './NestedObjectInput'; // Update the path to the actual location of NestedObjectInput.js
import DashboardCardSection from './DashboardCardSection';

const Home = ({ metrics, data }) => {

  const initialData = {
    person: {
      name: 'John Doe',
      age: 30,
      address: {
        city: 'New York',
        zip: '10001'
      },
      hobbies: ['Reading', 'Traveling']
    }
  };

  const [nestedObject, setNestedObject] = useState(initialData);

  const handleNestedObjectChange = (path, value) => {
    // Function to update the nested object when a field changes
    // Implement your logic to update the object based on the path and new value
    // For example, using the path to update the nestedObject
    setNestedObject(prevState => {
      // Clone the previous state to avoid mutating it directly
      const updatedObject = { ...prevState };

      // Use the path to update the nested field
      let nestedField = updatedObject;
      for (const key of path.slice(0, -1)) {
        nestedField = nestedField[key];
      }
      nestedField[path[path.length - 1]] = value;

      return updatedObject;
    });
  };

  const handleDelete = path => {
    // Function to delete a field within the nested object
    // Implement your logic to delete the field based on the path
    // For example, using the path to delete the nested field
    setNestedObject(prevState => {
      // Clone the previous state to avoid mutating it directly
      const updatedObject = { ...prevState };

      let nestedField = updatedObject;
      for (const key of path.slice(0, -1)) {
        nestedField = nestedField[key];
      }
      delete nestedField[path[path.length - 1]];

      return updatedObject;
    });
  };

  const handleReturnObject = () => {
    // Function to handle returning the modified object
    console.log('Modified Object:', nestedObject);
    // You can perform further actions with the modified object here
  };

  return (
    <div className=''>
      <div className="">
        <DashboardCardSection {...{ metrics }} />
      </div>

      {/* Render NestedObjectInput with the nested object */}
      <NestedObjectInput
        data={nestedObject}
        onChange={handleNestedObjectChange}
        onDelete={handleDelete}
        onReturnObject={handleReturnObject}
      />
    </div>
  );
};

export default Home;
