const BestEmployees = () => {
    const employees = [
    { name: 'Theresa Webb', role: 'Waiter', earnings: '23,700', img: 'https://i.pravatar.cc/150?u=1' },
    { name: 'Alice Flores', role: 'Waiter', earnings: '21,389', img: 'https://i.pravatar.cc/150?u=2' },
    { name: 'Tim Henderson', role: 'Manager', earnings: '15,622', img: 'https://i.pravatar.cc/150?u=3' },
    { name: 'Jason Collins', role: 'Courier', earnings: '14,121', img: 'https://i.pravatar.cc/150?u=4' },
  ];
  return (
    <div className="card best-employees">
            <div className="card-header">
              <h3>Best employees</h3>
              <button className="dots-btn">Today ⌄</button>
            </div>
            <div className="list-header">
              <span>Employee</span>
              <span>Earnings</span>
            </div>
            <ul className="list-items">
              {employees.map((emp, index) => (
                <li key={index} className="list-item">
                  <div className="item-left">
                    <img src={emp.img} alt={emp.name} className="avatar" />
                    <div className="item-details">
                      <span className="item-name">{emp.name}</span>
                      <span className="item-role">{emp.role}</span>
                    </div>
                  </div>
                  <span className="item-count">${emp.earnings}</span>
                </li>
              ))}
            </ul>
          </div>
  );
};

export default BestEmployees;
