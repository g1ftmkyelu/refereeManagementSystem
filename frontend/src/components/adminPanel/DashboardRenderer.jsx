import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from './utils/helperFunctions';
import { useSelector } from 'react-redux';

const DashboardRenderer = ({ dashboards }) => {
    const role = useSelector((state) => state.role);
    const navigate = useNavigate();

    useEffect(() => {
        if (!getToken()) {
            navigate('/login');
        }
    }, [role]); // Add role as a dependency
    

    const dashboardComponent = dashboards.find((dashboard) => dashboard.props.role === role);

    if (!dashboardComponent) {
        return null; // Handle the case where no matching dashboard is found
    }

    return(
        <>
       
        <dashboardComponent.type {...dashboardComponent.props} />
         </>
         );
};

export default DashboardRenderer;
