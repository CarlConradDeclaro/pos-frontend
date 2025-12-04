import React, { useEffect, useState } from 'react';

const Deliveries = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="card">
      <h3><b>Deliveries</b></h3>
      <div className="donut-chart-container">
        <svg viewBox="0 0 36 36" className="donut-chart">
          <path
            className="donut-ring"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />

          <path
            className={`donut-segment ${animate ? 'animate-donut' : ''}`}
            strokeDasharray="82, 100"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>

        <div className="donut-text">
          <strong>125</strong>
          <small>Total</small>
        </div>
      </div>

      <div className="legend center">
        <span className="dot green"></span> Completed (82) 
        <span className="dot yellow" style={{ marginLeft: '10px' }}></span> Pending (43)
      </div>
    </div>
  );
};

export default Deliveries;
