import React, { useState } from 'react';
import { FaBell } from "react-icons/fa";


const DashboardTopBar = ({ handleLogOut, userData }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="h-20 bg-gray-100  flex items-center justify-end">
      {userData && (
        <div className="flex items-center mr-10">
          <div className="mr-4">
            <FaBell />
          </div>
          <div
            onClick={toggleDropdown}
            className="text-white bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center"
          >
            {userData.username[0]}
          </div>
          <span className='mx-2'>
            <h5 className="text-lg ">{userData.firstName+" "+userData.lastName}</h5>
            <p className='text-sm'>{userData.role}</p>
          </span>
          <div className="relative ml-4 cursor-pointer">
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-md">
                <ul>
                  <li onClick={handleLogOut} className="py-2 px-4 cursor-pointer">
                    Logout
                  </li>
                  {/* Add other dropdown options if needed */}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      
    </div>
  );
};

export default DashboardTopBar;
