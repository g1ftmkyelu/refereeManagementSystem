import React from 'react';
import axios from 'axios';

const SelectField = ({title, value, onChange, dataSource }) => {
  const [usersData, setUsersData] = React.useState([]);

  React.useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get(
          dataSource,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
        setUsersData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsersData();
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 p-3 w-full rounded-md mb-4"
      required
    >
      <option value="">{title}</option>
      {usersData.map((user) => (
        <option
          key={`${user.firstName}-${user.lastName}`}
          value={`${user.firstName} ${user.lastName}`}
        >
          {`${user.firstName} ${user.lastName}`}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
