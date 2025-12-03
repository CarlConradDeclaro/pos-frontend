import React from 'react';
import DailySales from '../components/Dashboard/DailySales';
import TotalIncome from '../components/Dashboard/TotalIncome';
import StatsCard from '../components/Dashboard/StatsCard';
import BestEmployees from '../components/Dashboard/BestEmployees';
import { useState } from 'react';

const Dashboard = () => {
  // Mock data for the lists to keep the JSX clean
  const dishes = [
    { name: 'Cheeseburger', category: 'Food', count: 519, icon: '🍔', color: '#ffc107' },
    { name: 'Latte', category: 'Drinks', count: 408, icon: '☕', color: '#b3e5fc' },
    { name: 'Spicy Chicken', category: 'Food', count: 314, icon: '🍗', color: '#ffcc80' },
    { name: 'Pasta Carbonara', category: 'Food', count: 210, icon: '🍝', color: '#ffc107' },
  ];

  const timeOptions = ["Yesterday", "Today", "Week", "Month", "Year"];
  const [Time, Settime] = useState("today");

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header from your snippet */}
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <nav className="time-nav">
          {timeOptions.map((option) => (
            <span
              key={option}
              className={Time.toLowerCase() === option.toLowerCase() ? "active" : ""}
              onClick={() => Settime(option.toLowerCase())}
              style={{ cursor: "pointer" }}
            >
              {option}
          </span>
          ))}
        </nav>
        </header>

        {/* Main Grid Content */}
        <div className="dashboard-grid">
          
          {/* Card 1: Daily Sales (Line Chart) */}
          <DailySales/>

          {/* Card 2: Total Income (Donut Chart) */}
          <TotalIncome/>

          {/* Right Column: Stats Cards */}
          <StatsCard/>

          {/* Bottom Row: Trending Dishes */}
          <div className="card trending-dishes">
            <div className="card-header">
              <h3>Trending dishes</h3>
              <button className="dots-btn">Today ⌄</button>
            </div>
            <div className="list-header">
              <span>Dishes</span>
              <span>Orders</span>
            </div>
            <ul className="list-items">
              {dishes.map((dish, index) => (
                <li key={index} className="list-item">
                  <div className="item-left">
                    <div className="dish-icon">{dish.icon}</div>
                    <div className="item-details">
                      <span className={`tag ${dish.category.toLowerCase()}`}>{dish.category}</span>
                      <span className="item-name">{dish.name}</span>
                    </div>
                  </div>
                  <span className="item-count">{dish.count}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Row: Best Employees */}
          <BestEmployees/>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;