import React, { useState } from 'react';
import DashboardCardSection from './DashboardCardSection';

const Home = ({ metrics }) => {


  return (
    <div className=''>
      <div className="">
        <DashboardCardSection {...{ metrics }} />
      </div>
    </div>
  );
};

export default Home;
