const DailySales = () => {
  return (
    <div className="card daily-sales">
            <div className="card-header">
              <h3>Daily sales</h3>
            </div>
            <div className="chart-container">
              {/* Static SVG representation of the wave chart */}
              <div className="tooltip-mock">
                <span className="tooltip-val">205</span>
                <div className="tooltip-dot"></div>
              </div>
              <svg viewBox="0 0 300 100" className="wave-chart">
                <path 
                  d="M0,100 L0,80 Q20,60 40,70 T80,50 T120,20 T160,70 T200,80 T240,60 T280,50 L300,60 L300,100 Z" 
                  fill="url(#gradient)" 
                  stroke="none"
                />
                <path 
                  d="M0,80 Q20,60 40,70 T80,50 T120,20 T160,70 T200,80 T240,60 T280,50 L300,60" 
                  fill="none" 
                  stroke="#D32F2F" 
                  strokeWidth="3"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(211, 47, 47, 0.2)" />
                    <stop offset="100%" stopColor="rgba(211, 47, 47, 0)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="chart-labels">
                <span>9:00 am</span>
                <span>12:00 pm</span>
                <span>03:00 pm</span>
                <span>06:00 pm</span>
              </div>
            </div>
          </div>
  );
};

export default DailySales;
