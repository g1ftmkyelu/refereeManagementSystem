import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const ApiSelect = ({ title, value, onChange, displayModeKey, endpoint }) => {
  const { data: responseData, isLoading, isError } = useQuery(endpoint, async () => {
    const response = await axios.get('YOUR_API_ENDPOINT');
    return response.data;
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  const renderOptions = () => {
    return responseData.map((item, index) => (
      <option key={index} value={getDisplayValue(item)}>
        {getDisplayValue(item)}
      </option>
    ));
  };

  const getDisplayValue = (item) => {
    if (Array.isArray(displayModeKey)) {
      // If displayModeKey is an array, combine multiple keys
      return displayModeKey.map((key) => item[key]).join(' ');
    } else if (displayModeKey && item.hasOwnProperty(displayModeKey)) {
      // If displayModeKey is a single valid key, use it
      return item[displayModeKey];
    } else {
      // If the key is not found or invalid, default to displaying the item itself
      return JSON.stringify(item);
    }
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 p-3 w-full rounded-md mb-4"
    >
      <option value="">{title}</option>
      {renderOptions()}
    </select>
  );
};

export default ApiSelect;
