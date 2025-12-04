import {Calendar} from 'lucide-react';

const DashboardHeader = () => {
    return(
    <header className="dashboard-header">
        <div>
          <h1 className='w-5/12 text-2xl font-bold text-gray-800'>Dashboard</h1>
          <p>Welcome back, Theresa! Here's your performance overview.</p>
        </div>
        <div className="date-filter">
          <div><Calendar/></div>
           Last 30 days <span>▼</span>
        </div>
      </header>
    )
}

export default DashboardHeader