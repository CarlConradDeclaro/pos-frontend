import React, { useEffect, useState } from 'react';
import '../Dashboard/Dashboard.css';

const Asn = () => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    const barData = [
        { label: 'Week 1', value: 48 },
        { label: 'Week 2', value: 76 },
        { label: 'Week 3', value: 60 },
        { label: 'Week 4', value: 84 },
    ];

    return (
        <div className="card">
            <h3><b>ASNs Sent</b></h3>
            
            <div className="chart-container">
                <div className="y-axis">
                    <span>25</span>
                    <span>20</span>
                    <span>15</span>
                    <span>10</span>
                    <span>5</span>
                    <span>0</span>
                </div>

                <div className="chart-area">
                    <div className="grid-lines">
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>

                    <div className="bars-container">
                        {barData.map((bar, i) => (
                            <div className="v-bar-group" key={i}>
                                <div
                                    className="v-bar"
                                    style={{ height: animate ? `${bar.value}%` : '0%' }}
                                ></div>
                                <span className="x-label">{bar.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="legend">
                <span className="dot green"></span> Sent 
                <span className="dot grey" style={{ marginLeft: '10px' }}></span> Draft
            </div>
        </div>
    );
};

export default Asn;
