import React, { useEffect, useState } from 'react';
import '../Dashboard/Dashboard.css';

const Chart = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Data points
  const points = [
    { x: 0, y: 100 },
    { x: 80, y: 105 },
    { x: 145, y: 83 },
    { x: 215, y: 64 },
    { x: 287, y: 91 },
    { x: 357, y: 121 },
    { x: 423, y: 105 },
    { x: 500, y: 50 },
  ];

  const linePath = `
    M${points[0].x},${points[0].y}
    Q80,120 150,80
    T300,100
    T500,50
  `;

  const areaPath = `
    M${points[0].x},${points[0].y}
    Q80,120 150,80
    T300,100
    T500,50
    V150 H0 Z
  `;

  return (
    <div className="card span-2">
      <h3><b>Total POs Received</b></h3>
      <div className="chart2-container line-chart-placeholder">
        <div className="chart-labels-y">
          <span>120</span>
          <span>100</span>
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>

        <svg viewBox="0 0 500 150" className="simple-line-chart">
          {[4, 28, 52, 75, 99, 123, 150].map((y, i) => (
            <line key={i} x1="0" y1={y} x2="500" y2={y} stroke="#eee" />
          ))}

          {/* Area under the line */}
          <path
            d={areaPath}
            fill="rgba(255, 193, 7, 0.1)"
            className={animate ? 'area-path animate-area' : 'area-path'}
          />

          {/* Line */}
          <path
            d={linePath}
            fill="none"
            stroke="#FFC107"
            strokeWidth="3"
            className={animate ? 'line-path animate-line' : 'line-path'}
          />

          {/* Points */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="#FFC107"
              className={animate ? 'line-point animate-point' : 'line-point'}
              style={{ animationDelay: `${i * 0.1 + 0.1}s` }}
            />
          ))}
        </svg>
      </div>

      <div className="chart-labels-x">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
      </div>
    </div>
  );
};

export default Chart;
