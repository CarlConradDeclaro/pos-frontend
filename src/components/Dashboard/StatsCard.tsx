const StatsCard = () => {
  return (
    <div className="stats-column">
            <div className="card stat-card">
              <div className="stat-header">
                <div className="icon-box red-icon">🧾</div>
                <div className="stat-info">
                  <span className="stat-title">Total Orders</span>
                  <span className="stat-perc negative">-2.33%</span>
                </div>
              </div>
              <div className="stat-value">21,375</div>
              <div className="progress-bar"><div className="fill red-fill" style={{width: '70%'}}></div></div>
            </div>

            <div className="card stat-card">
              <div className="stat-header">
                <div className="icon-box yellow-icon">👥</div>
                <div className="stat-info">
                  <span className="stat-title">New Customers</span>
                  <span className="stat-perc positive">+32.40%</span>
                </div>
              </div>
              <div className="stat-value">256</div>
              <div className="progress-bar"><div className="fill yellow-fill" style={{width: '40%'}}></div></div>
            </div>
          </div>
  );
};

export default StatsCard;