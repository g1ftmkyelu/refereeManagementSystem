import React from 'react';
import DashboardRenderer from './components/adminPanel/DashboardRenderer';
import Dashboard from './components/adminPanel/UIs/Dashboard';

import { HospitalAdminResources } from './components/adminPanel/configs/resources/HospitalAdminResources';
import { DoctorResources } from './components/adminPanel/configs/resources/DoctorResources';
import { PatientResources } from './components/adminPanel/configs/resources/PatientResources';
import { pharmacistResources } from './components/adminPanel/configs/resources/pharmacistResources';
import { inventoryManagerResources } from './components/adminPanel/configs/resources/inventoryManagerResources';




function App() {
  const dashboardData = [
    { resources: DoctorResources, role: 'doctor' },
    { resources: HospitalAdminResources, role: 'admin' },
    { resources: PatientResources, role: 'patient' },
    { resources: pharmacistResources, role: 'pharmacist' },
    { resources: inventoryManagerResources, role: 'inventory manager' }
  ];

  const dashboards = dashboardData.map(({ resources, role }, index) => (
    <Dashboard key={index} resources={resources} role={role} />
  ));

  return <DashboardRenderer dashboards={dashboards} />;
}

export default App;
