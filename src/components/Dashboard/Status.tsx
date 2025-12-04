import { FileText, ClipboardList, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const Status = () => {
    const [Overdue, setOverdue] = useState(3);

    return (
        <>
            <div className="card stat-card">
                <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                    <FileText size={24} />
                </div>
                <div>
                    <p className="stat-title">New POs Received</p>
                    <h2 className="stat-value">12</h2>
                </div>
            </div>

            <div className="card stat-card">
                <div className="p-3 bg-amber-50 rounded-full text-amber-600">
                    <ClipboardList size={24} />
                </div>
                <div>
                    <p className="stat-title">Orders in Progress</p>
                    <h2 className="stat-value">5</h2>
                </div>
            </div>

            <div className="card stat-card">
                <div
                    className={`p-3 rounded-full ${
                        Overdue > 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                    }`}
                >
                    {Overdue > 0 ? <AlertCircle size={24} /> : <CheckCircle size={24} />}
                </div>
                <div>
                    <p className="stat-title">Deliveries Overdue</p>
                    <h2 className="stat-value">{Overdue}</h2>
                </div>
            </div>
        </>
    );
};

export default Status;
