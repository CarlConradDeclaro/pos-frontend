import React from 'react';
import '../components/Dashboard/Dashboard.css';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import Status from '../components/Dashboard/Status';
import Chart from '../components/Dashboard/Chart';
import Asn from '../components/Dashboard/Asn';
import Deliveries from '../components/Dashboard/Deliveries';
import TopItems from '../components/Dashboard/TopItems';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Header */}
      <DashboardHeader/>

      {/* Main Grid Layout */}
      <div className="dashboard-grid">
        
        {/* Top Stats Row */}
        <Status/>

        {/* Middle Row */}
        <Chart/>
        <Asn/>

        {/* Bottom Row */}
        <Deliveries/>
        <TopItems/>

      </div>
    </div>
  );
};

export default Dashboard;