import React, { useEffect, useState } from "react";

const TopItems = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const data = [
    { name: 'Tomatoes', value: 450 },
    { name: 'Avocados', value: 380 },
    { name: 'Lettuce', value: 320 },
    { name: 'Onions', value: 250 },
    { name: 'Potatoes', value: 210 },
  ];

  const maxValue = 450;
  const gridSteps = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450];

  return (
    <div className="card span-2">

      <h3><b>Top Selling Items</b></h3>

      <div className="relative w-full" style={{ height: "220px" }}>

        <div className="flex">

          <div className="flex flex-col justify-between pr-4 w-24">
            {data.map((item) => (
              <div key={item.name} className="h-10 flex items-center justify-end">
                <span className="text-gray-500 text-sm">{item.name}</span>
              </div>
            ))}
          </div>

          <div className="relative flex-grow">

            <div
              className="absolute inset-0 flex justify-between pointer-events-none"
              style={{ transform: "translateX(-6px)" }}
            >
              {gridSteps.map((step, i) => (
                <div key={i} className="h-full flex items-center">
                  <div
                    className={`h-full border-r ${i === 0 ? 'border-transparent' : 'border-gray-200'}`}
                  ></div>
                </div>
              ))}
            </div>

            <div className="relative z-10 flex flex-col justify-between">
              {data.map((item) => (
                <div key={item.name} className="h-10 flex items-center">
                  <div
                    className="h-6 bg-yellow-300 rounded-md border border-yellow-400/20 transition-all duration-700"
                    style={{
                      width: animate
                        ? `${(item.value / maxValue) * 100}%`
                        : "0%",
                    }}
                  ></div>
                </div>
              ))}
            </div>

          </div>

        </div>

        <div
          className="flex ml-24 mt-2 justify-between text-xs text-gray-400"
          style={{ transform: "translateX(2px)" }}
        >
          {gridSteps.map((step) => (
            <span key={step}>{step}</span>
          ))}
        </div>

      </div>

    </div>
  );
};

export default TopItems;
