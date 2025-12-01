const TotalIncome = () => {
  return (
    <div className="card total-income">
            <div className="card-header">
              <h3>Total income</h3>
              <button className="dots-btn">Today ⌄</button>
            </div>
            <div className="donut-wrapper">
              <div className="donut-chart">
                <div className="center-text">
                  <h2>$77,541</h2>
                </div>
              </div>
            </div>
            <div className="legend">
              <span className="dot red"></span> Food
              <span className="dot yellow"></span> Drinks
              <span className="dot black"></span> Others
            </div>
          </div>

  );
};

export default TotalIncome;
