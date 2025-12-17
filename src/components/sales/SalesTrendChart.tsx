import React, { useEffect, useState } from 'react';
import { FiMoreHorizontal, FiArrowUpRight } from "react-icons/fi";

// --- 1. Helper Components ---

const CardHeader = ({ title, subtitle, action }: { title: string, subtitle: string, action: React.ReactNode }) => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
    {action}
  </div>
);

const SalesTrendChart = () => {
  const [animate, setAnimate] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    // Small timeout to ensure DOM is ready for transition
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // --- 2. Chart Configuration & Data ---
  
  // Dimensions for the SVG ViewBox
  const width = 600;
  const height = 200;
  
  // Data Points (Mapping roughly to Mon-Sun)
  // y=0 is top ($5k), y=200 is bottom ($0k)
  const points = [
    { x: 0,   y: 180, label: 'Mon', val: '$1k' },
    { x: 100, y: 120, label: 'Tue', val: '$2.8k' },
    { x: 200, y: 140, label: 'Wed', val: '$2.1k' },
    { x: 300, y: 80,  label: 'Thu', val: '$3.5k' }, // Peak 1
    { x: 400, y: 100, label: 'Fri', val: '$3.0k' },
    { x: 500, y: 40,  label: 'Sat', val: '$4.2k' },
    { x: 600, y: 20,  label: 'Sun', val: '$4.8k' }, // Peak 2
  ];

  // SVG Path Command (Smooth Cubic Bezier)
  // Manually tuned to look like the "Green" chart in your image
  const linePath = `
    M ${points[0].x},${points[0].y}
    C 50,180 50,120 100,120
    S 150,140 200,140
    S 250,80 300,80
    S 350,100 400,100
    S 450,40 500,40
    S 550,20 600,20
  `;

  // Close the path for the filled area (down to bottom right, over to bottom left)
  const areaPath = `
    ${linePath}
    V ${height} H 0 Z
  `;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative">
      
      {/* --- Internal CSS for Animations --- */}
      <style>{`
        .chart-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          transition: stroke-dashoffset 2s ease-out;
        }
        .chart-path.animate {
          stroke-dashoffset: 0;
        }
        .chart-area {
          opacity: 0;
          transition: opacity 2s ease-out;
        }
        .chart-area.animate {
          opacity: 1;
        }
        .chart-point {
          opacity: 0;
          transform: scale(0);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .chart-point.animate {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>

      {/* --- Header Section --- */}
      <CardHeader
        title="Sales Trend"
        subtitle="Daily revenue performance"
        action={
          <div className="bg-gray-100 p-1 rounded-lg flex text-sm font-medium text-gray-500">
            <button className="px-3 py-1 bg-white rounded-md text-gray-900 shadow-sm transition-all">Daily</button>
            <button className="px-3 py-1 hover:text-gray-900 transition-colors">Weekly</button>
            <button className="px-3 py-1 hover:text-gray-900 transition-colors">Monthly</button>
          </div>
        }
      />

      {/* --- Chart Area --- */}
      <div className="h-64 w-full mt-4 relative flex">
        
        {/* Y-Axis Labels (Absolute positioned on left) */}
        <div className="flex flex-col justify-between text-xs text-gray-300 h-[200px] pr-4 select-none">
          <span>$5k</span>
          <span>$4k</span>
          <span>$3k</span>
          <span>$2k</span>
          <span>$1k</span>
          <span>$0</span>
        </div>

        {/* The SVG Graph */}
        <div className="flex-1 relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
              
              {/* Definitions for Gradients */}
              <defs>
                <linearGradient id="greenGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 40, 80, 120, 160, 200].map((y, i) => (
                <line 
                  key={i} 
                  x1="0" 
                  y1={y} 
                  x2={width} 
                  y2={y} 
                  stroke="#f3f4f6" 
                  strokeWidth="1" 
                  strokeDasharray="4 4"
                />
              ))}

              {/* Area Fill (The gradient under the line) */}
              <path
                d={areaPath}
                fill="url(#greenGradient)"
                className={`chart-area ${animate ? 'animate' : ''}`}
              />

              {/* The Line Itself */}
              <path
                d={linePath}
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`chart-path ${animate ? 'animate' : ''}`}
              />

              {/* The Data Points (Circles) */}
              {points.map((p, i) => (
                <g key={i}>
                    {/* Hover area (invisible larger circle for easier hovering) */}
                    <circle cx={p.x} cy={p.y} r="15" fill="transparent" className="cursor-pointer group" />
                    
                    {/* Visual Dot */}
                    <circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    fill="white"
                    stroke="#22c55e"
                    strokeWidth="2.5"
                    className={`chart-point ${animate ? 'animate' : ''} cursor-pointer hover:r-6 transition-all`}
                    style={{ 
                        transitionDelay: `${i * 0.1 + 0.5}s`, // Staggered fade in
                        transformBox: 'fill-box',
                        transformOrigin: 'center'
                    }}
                    />
                </g>
              ))}
            </svg>

            {/* X-Axis Labels */}
            <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                {points.map((p, i) => (
                    <span key={i}>{p.label}</span>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTrendChart;