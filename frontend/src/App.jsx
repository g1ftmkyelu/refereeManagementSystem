import React from 'react';
import DashboardRenderer from './components/adminPanel/DashboardRenderer';
import Dashboard from './components/adminPanel/UIs/Dashboard';


import { AdminResources } from './components/adminPanel/configs/resources/administratorResources';
import { MatchCommisonerResources } from './components/adminPanel/configs/resources/matchCommissionerResources';
import { allocationOfficerResources } from './components/adminPanel/configs/resources/allocationOfficerResources';
import { refereeResources } from './components/adminPanel/configs/resources/referee';
import { AssessorResources } from './components/adminPanel/configs/resources/asssessorResources';



function App() {
  const dashboardData = [
    { resources: AdminResources, role: 'administrator' },
    { resources: MatchCommisonerResources, role: 'matchcommissioner' },
    { resources: allocationOfficerResources, role: 'allocationofficer' },
    { resources: refereeResources, role: 'referee' },
    { resources: AssessorResources, role: 'assessor' },
  ];

  const dashboards = dashboardData.map(({ resources, role }, index) => (
    <Dashboard key={index} resources={resources} role={role} />
  ));

  return <DashboardRenderer dashboards={dashboards} />;
}

export default App;
