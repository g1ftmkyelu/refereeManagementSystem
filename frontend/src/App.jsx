import React from 'react';
import DashboardRenderer from './components/adminPanel/DashboardRenderer';
import Dashboard from './components/adminPanel/UIs/Dashboard';


import { AdminResources } from './components/adminPanel/configs/resources/administratorResources';
import { MatchCommisonerResources } from './components/adminPanel/configs/resources/matchCommissionerResources';



function App() {
  const dashboardData = [
    { resources: AdminResources, role: 'administrator' },
    {resources:MatchCommisonerResources, role: 'matchcommissioner'}

  ];

  const dashboards = dashboardData.map(({ resources, role }, index) => (
    <Dashboard key={index} resources={resources} role={role} />
  ));

  return <DashboardRenderer dashboards={dashboards} />;
}

export default App;
