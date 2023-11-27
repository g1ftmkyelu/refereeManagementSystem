import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../../utils/helperFunctions';
import { MoonLoader } from 'react-spinners';

const SelectField = ({ title, value, onChange, dataSource, displayKey }) => {
  const [resultsData, setResultsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const token = getToken();

  useEffect(() => {
    const fetchResultsData = async () => {
      try {
        const response = await axios.get(dataSource, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setResultsData(response.data);
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching result data:', error);
        setIsLoading(false); // Set loading to false on error as well
      }
    };

    fetchResultsData();
  }, [dataSource, token]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <MoonLoader  color="#1400ff" />
      </div>
    )
  }
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 p-3 w-full rounded-md mb-4"
      required
    >
      <option value="">{title}</option>
      {resultsData.map((result, i) => (
        <option key={i} value={result[displayKey]}>
          {result[displayKey]}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
