import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';
import { getToken } from '../../../utils/helperFunctions';

const ApiSelect = ({ title, value, onChange, dataSource }) => {
  const token = getToken();

  const { data: responseData, isLoading, isError } = useQuery(['data'], async () => {
    try {
      const response = await axios.get(dataSource, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  });

  if (isLoading) return <MoonLoader color="#1400ff" />;

  if (isError || !Array.isArray(responseData)) return <p>Error fetching data</p>;

  const extractedNames = responseData.map((item) => item.name);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 p-3 w-full rounded-md mb-4"
    >
      <option value="">{title}</option>
      {extractedNames.map((name, index) => (
        <option key={index} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default ApiSelect;
