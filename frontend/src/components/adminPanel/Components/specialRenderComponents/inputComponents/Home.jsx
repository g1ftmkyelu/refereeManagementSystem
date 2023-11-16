import React from 'react';
import DynamicChart from '../../dashboardComponents/charts/DynamicChart';
import DashboardCardSection from './DashboardCardSection';
import GridLayout from 'react-grid-layout';
import 'react-resizable/css/styles.css';
import 'react-grid-layout/css/styles.css';

const Home = ({ metrics, data }) => {


  


  return (
    <div className=''>
      <div className="">
        <DashboardCardSection {...{ metrics }} />
      </div>


    </div>
  );
};

export default Home;
