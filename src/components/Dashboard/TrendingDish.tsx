const TrendingDish = () => {
  const dishes = [
    { name: 'Cheeseburger', category: 'Food', count: 519, icon: '🍔', color: '#ffc107' },
    { name: 'Latte', category: 'Drinks', count: 408, icon: '☕', color: '#b3e5fc' },
    { name: 'Spicy Chicken', category: 'Food', count: 314, icon: '🍗', color: '#ffcc80' },
    { name: 'Pasta Carbonara', category: 'Food', count: 210, icon: '🍝', color: '#ffc107' },
  ];

  return (
    <div className="stats-column">
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
    </div>
  );
};

export default TrendingDish;
