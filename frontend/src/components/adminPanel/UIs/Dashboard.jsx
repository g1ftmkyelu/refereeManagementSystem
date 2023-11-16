import React, { useEffect } from 'react';
import DashboardRouter from '../DashboardRouter';

const Dashboard = ({ resources, role }) => {


    return (
        <>
            <DashboardRouter style={{width:'100vw'}} resources={resources} />
        </>
    );
}

export default Dashboard;
