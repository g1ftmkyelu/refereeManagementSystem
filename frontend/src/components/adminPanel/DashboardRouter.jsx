import { Route, Routes } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ResourceRender from "./Components/coreComponents/ResourceRender";
import SideNav from "./Components/coreComponents/SideNav"
import NotFound from "./Components/utilityComponents/NotFound";
import LoginPage from "./UIs/loginPage";
import { useDispatch } from "react-redux";
import { fetchUserData, signOut } from "../../Redux/slices/authThunk";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import DashboardTopBar from './DashboardTopBar';
import { setRole } from "../../Redux/slices/roleSlice";
import RegisterPage from "./UIs/RegisterPage";


function Allocator({ resources }) {
  const { resource } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [userData, setUserData] = useState(null); // Initialize user data as null

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await dispatch(fetchUserData());
        console.log(data);
        const { payload } = data;
        setUserData(payload); 
        // Set the user data in the state
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();

  }, [dispatch]);


  const handleLogOut = async () => {
    try {
      const result = await Swal.fire({
        title: 'Confirm Logout',
        text: 'Are you sure you want to log out?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, sign me out!',
        cancelButtonText: 'No, cancel',
      });

      if (result.isConfirmed) {
        dispatch(signOut());
        toast.success("Logout Successfully");
        nav('/login');
      } else {
        Swal.fire('Cancelled', 'Log out cancelled.', 'info');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Error deleting item', { position: 'top-right' });
    }
  }


  // Find the matching Resource in the resources array
  const matchedComponent = resources.find((config) => config.path === resource);

  // Render the matched resource with parsed data or the NotFound component
  if (matchedComponent) {
    const DataToRender = matchedComponent;
    return (
      
      <div className="flex w-full bg-gray-200   h-screen">
        
        
          <SideNav  
              resources={resources}
          />
      
        <div className="w-screen  flex flex-col">
          <DashboardTopBar {...{ React, handleLogOut, userData }} />

          <div className=" h-full overflow-y-auto">
                     
              <ResourceRender data={DataToRender} />
            
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
}

function DashboardRouter({ resources }) {

  return (
    <Routes>
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/:resource" element={<Allocator resources={resources} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

  );
}

export default DashboardRouter;
