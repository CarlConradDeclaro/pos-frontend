import React from "react";
import { useState, useEffect } from "react";
import {
  FiCalendar,
  FiDownload,
  FiMoreHorizontal,
  FiArrowUpRight,
  FiArrowDownRight,
  FiAlertTriangle,
  FiTrendingUp,
  FiDollarSign,
  FiCreditCard,
  FiActivity,
  FiFileText,
  FiShoppingBag,
  FiCoffee,
  FiPackage,
  FiHome,
  FiGrid,
  FiSettings,
  FiBell,
  FiLogOut,
} from "react-icons/fi";
import { LuHandCoins, LuCalendarPlus, LuPiggyBank, LuFolderOpenDot } from "react-icons/lu";
import { IoFastFoodOutline } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import SalesTrendChart from "./SalesTrendChart";


// ==========================================
// 1. Types & Interfaces
// ==========================================

// Top 4 Stats Cards
interface StatCardProps {
  title: string;
  value: string;
  trendIcon: React.ReactNode;
  trendColorBg: string;
  trendColorText: string;
  percentage: string;
  subText?: string;
}

// Popular Items Table Row
interface PopularItem {
  rank: number;
  name: string;
  category: string;
  image: string;
  sales: number;
  revenue: string;
}

// Categories Progress Bar
interface CategoryStat {
  name: string;
  percentage: number;
  colorClass: string;
  icon: React.ReactNode;
}

// Waste Report Items
interface WasteItem {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  name: string;
  count: string;
  value: string;
}

// --- Helper: Animated Counter Component ---
const AnimatedCounter = ({ value, duration = 1500 }: { value: string | number, duration?: number }) => {
  const [displayValue, setDisplayValue] = React.useState("0");

  React.useEffect(() => {
    // 1. Parse the input string
    const stringVal = String(value);
    
    // Extract the numeric part (removes $, %, and commas)
    // Matches optional negative sign, digits, optional decimal part
    const numericMatch = stringVal.match(/-?[\d,]+(\.\d+)?/);
    if (!numericMatch) {
      setDisplayValue(stringVal);
      return;
    }

    const rawNumberStr = numericMatch[0].replace(/,/g, ''); // Remove commas for parsing
    const end = parseFloat(rawNumberStr);
    const start = 0;
    
    // Detect formatting needs
    const hasDecimal = rawNumberStr.includes('.');
    const decimalPlaces = hasDecimal ? rawNumberStr.split('.')[1].length : 0;
    const prefix = stringVal.split(numericMatch[0])[0];
    const suffix = stringVal.split(numericMatch[0])[1];

    // 2. Animation Logic
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Calculate completion (0 to 1)
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (Ease Out Quart) - starts fast, slows down at end
      const ease = 1 - Math.pow(1 - percentage, 4);
      
      const current = start + (end - start) * ease;

      // Format the number back to string with commas
      const formattedNumber = current.toLocaleString('en-US', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      });

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return <span>{displayValue}</span>;
};


// ==========================================
// 2. Sample Data (From Image)
// ==========================================

const popularItemsData: PopularItem[] = [
  {
    rank: 1,
    name: "Double Cheese Burger",
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
    sales: 245,
    revenue: "$3,430",
  },
  {
    rank: 2,
    name: "Hazelnut Latte",
    category: "Beverages",
    image: "https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg",
    sales: 198,
    revenue: "$1,089",
  },
  {
    rank: 3,
    name: "Margherita Pizza",
    category: "Pizza",
    image: "https://images.pexels.com/photos/16890470/pexels-photo-16890470.jpeg",
    sales: 156,
    revenue: "$2,184",
  },
];

const categoryData: CategoryStat[] = [
  {
    name: "Food",
    percentage: 65,
    colorClass: "bg-green-500",
    icon: <IoFastFoodOutline />,
  },
  {
    name: "Beverages",
    percentage: 25,
    colorClass: "bg-blue-400",
    icon: <FiCoffee />,
  },
  {
    name: "Desserts",
    percentage: 10,
    colorClass: "bg-orange-400",
    icon: <FiPackage />,
  },
];

const wasteItemsData: WasteItem[] = [
  {
    icon: <FiPackage size={18} />,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    name: "Expired Produce",
    count: "5 items",
    value: "$42.00",
  },
  {
    icon: <FiAlertTriangle size={18} />,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    name: "Kitchen Error",
    count: "2 items",
    value: "$42.00",
  },
];

// ==========================================
// 3. Sub-Components (Building Blocks)
// ==========================================

// ----- Top Stats Card -----
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trendIcon,
  trendColorBg,
  trendColorText,
  percentage,
  subText,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${trendColorBg} ${trendColorText}`}
        >
          {trendIcon}
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
            percentage.startsWith("+")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {percentage.startsWith("+") ? <FiArrowUpRight /> : <FiArrowDownRight />}
          <AnimatedCounter value={percentage}/>
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <h3 className="text-3xl font-extrabold text-gray-900"> <AnimatedCounter value={value}/></h3>
      {subText && <p className="text-xs text-gray-400 mt-2 font-medium uppercase">{subText}</p>}
    </div>
  );
};

// ----- Reusable Card Header -----
const CardHeader: React.FC<{
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}> = ({ title, subtitle, action }) => (
  <div className="flex justify-between items-center mb-6">
    <div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
    {action}
  </div>
);

//----- Impact on Sales Chart ----
const ImpactSalesChart = () => {
  const [animate, setAnimate] = useState(false);

  React.useEffect(() => {
    // Delay slightly so it starts after the main page loads
    const timer = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <style>{`
        .impact-line {
          stroke-dasharray: 120; /* Length of the path */
          stroke-dashoffset: 120;
          transition: stroke-dashoffset 1.5s ease-out;
        }
        .impact-line.active {
          stroke-dashoffset: 0;
        }
      `}</style>
      
      <p className="text-xs text-gray-500 uppercase font-bold mb-3">Impact on Sales</p>
      
      {/* Chart SVG */}
      <svg className="w-full h-16" viewBox="0 0 100 30" preserveAspectRatio="none">
        <path
          d="M0,25 C20,20 40,28 50,15 C60,5 80,10 100,2"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          className={`impact-line ${animate ? "active" : ""}`}
        />
        
        {/* Optional: Add a subtle gradient fill below the line */}
        <path
           d="M0,25 C20,20 40,28 50,15 C60,5 80,10 100,2 L100,30 L0,30 Z"
           fill="url(#impactGradient)"
           className={`transition-opacity duration-1000 ${animate ? "opacity-100" : "opacity-0"}`}
        />
        <defs>
            <linearGradient id="impactGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
// Category Helper (for animation purposes)
const CategoryRow = ({ cat, index }: { cat: any; index: number }) => {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    // Delay animation based on index (staggered effect)
    // 1st item waits 100ms, 2nd waits 300ms, etc.
    const timer = setTimeout(() => {
      setWidth(cat.percentage);
    }, 100 + index * 200);

    return () => clearTimeout(timer);
  }, [cat.percentage, index]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2 text-sm font-medium">
        <span className="flex items-center gap-2 text-gray-700">
          <span className={`w-2 h-2 rounded-full ${cat.colorClass}`}></span>
          {cat.name}
        </span>
        <span className="text-gray-900 font-bold">
          {/* Re-using your AnimatedCounter here for the text number */}
          <AnimatedCounter value={cat.percentage} />%
        </span>
      </div>
      <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${cat.colorClass} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

// ==========================================
// 4. Main Dashboard Component
// ==========================================

const SalesOverview = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">

      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Sales Overview</h1>
            <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <FiCalendar /> Oct 24 - Oct 30
            </button>
            <button className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
              <FiDownload size={20} />
            </button>
          </div>
        </div>

        {/* AI Insight Banner */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-8 flex items-start gap-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
             <FiTrendingUp className="text-white" size={14}/>
          </div>
          <div>
             <p className="text-xs font-bold text-green-700 uppercase mb-1">AI Insights</p>
            <p className="text-sm text-green-800 font-medium">
              "Sales increased this week mainly due to higher dessert orders on
              Thu-Sun. However, waste cost rose by 2.1%, driven by expired produce."
            </p>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value="$24,592"
            trendIcon={<LuHandCoins size={20} />}
            trendColorBg="bg-green-100"
            trendColorText="text-green-600"
            percentage="+12.5%"
          />
          <StatCard
            title="Total Cost"
            value="$8,450"
            trendIcon={<FiCreditCard size={20} />}
            trendColorBg="bg-orange-100"
            trendColorText="text-orange-600"
            percentage="+4.2%"
          />
          <StatCard
            title="Gross Profit"
            value="$16,142"
            trendIcon={<LuPiggyBank size={20} />}
            trendColorBg="bg-blue-100"
            trendColorText="text-blue-600"
            percentage="+18.2%"
          />
          <StatCard
            title="Transaction"
            value="578"
            trendIcon={<LuFolderOpenDot size={20} />}
            trendColorBg="bg-purple-100"
            trendColorText="text-purple-600"
            percentage="-2.5%"
            subText="AVG ORDER $42.50"
          />
        </div>

        {/* Main Grid Layout (2 Columns) */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column (Span 2) */}
          <div className="col-span-2 space-y-6">
            {/* Sales Trend Chart Card */}
            <SalesTrendChart />

            {/* Popular Items Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <CardHeader
                title="Popular Items"
                subtitle="Top selling products by volume"
                action={
                  <button className="text-green-600 text-sm font-bold flex items-center hover:underline">
                    View All <FiArrowUpRight className="ml-1" />
                  </button>
                }
              />
              <table className="w-full text-left">
                <thead className="text-xs text-gray-400 uppercase font-semibold border-b border-gray-100">
                  <tr>
                    <th className="pb-3 pl-4">Product</th>
                    <th className="pb-3 text-right">Sales</th>
                    <th className="pb-3 text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {popularItemsData.map((item) => (
                    <tr key={item.rank} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 pl-4">
                        <div className="flex items-center gap-4">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              item.rank === 1
                                ? "bg-yellow-400 text-white"
                                : item.rank === 2
                                ? "bg-gray-200 text-gray-600"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {item.rank}
                          </span>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                          />
                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-right font-bold text-gray-900">
                        <AnimatedCounter value={item.sales}/>
                      </td>
                      <td className="py-4 text-right font-bold text-gray-900">
                        <AnimatedCounter value={item.revenue}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column (Span 1) */}
          <div className="col-span-1 space-y-6">
            {/* Promotion Performance Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <CardHeader
                title="Promotion Performance"
                subtitle="Discount impact & top deals"
                action={<button className="text-gray-400 hover:text-gray-600"><FiMoreHorizontal size={20}/></button>}
              />
              <div className="mb-6">
                 <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total Discounts Applied</p>
                 <div className="flex justify-between items-end">
                    <h3 className="text-3xl font-extrabold text-gray-900">$<AnimatedCounter value= {1248.50} /></h3>
                    <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-green-100 text-green-700">
                       <FiArrowUpRight /> + <AnimatedCounter value={8.4} />%
                    </span>
                 </div>
              </div>

              <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-500 shadow-sm">
                    <FiPackage size={24} variant="fill" />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-green-700 uppercase">Most Popular</p>
                    <p className="text-lg font-bold text-gray-900"><AnimatedCounter value={20}/>% off Desserts</p>
                    <p className="text-sm text-gray-500">Used <AnimatedCounter value={86}/> times today</p>
                 </div>
              </div>

               <div>
                  {/* Tiny Chart */}
                   <ImpactSalesChart />
               </div>
            </div>

            {/* Categories Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <CardHeader title="Categories" />
            <div className="space-y-6">
                {categoryData.map((cat, index) => (
                <CategoryRow key={cat.name} cat={cat} index={index} />
                ))}
            </div>
            </div>

             {/* AI Alert Floating Card */}
             <div className="bg-white p-4 rounded-2xl border border-red-100 shadow-md relative overflow-hidden">
                 {/* Close button (mock) */}
                 <div className="absolute top-2 right-2 text-gray-400 cursor-pointer"><FiX size={16}/></div>
                <p className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase mb-2">
                   <FiAlertTriangle /> AI Alert
                </p>
                <div className="flex gap-3">
                   <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiAlertTriangle className="text-red-500" size={20}/>
                   </div>
                   <div>
                       <p className="font-bold text-gray-900 text-sm leading-tight mb-1">Waste cost is higher than the weekly average.</p>
                       <p className="text-xs text-gray-500 leading-normal">Driven by expired produce and kitchen errors today.</p>
                   </div>
                </div>
             </div>

            {/* Waste Report Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative">
              <CardHeader title="Waste Report" action={<span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md uppercase">Today</span>}/>

              <div className="mb-6">
                 <div className="flex items-end gap-2">
                    <h3 className="text-3xl font-extrabold text-gray-900">$<AnimatedCounter value={84.50} /></h3>
                    <span className="text-xs font-bold text-red-500 mb-1">+<AnimatedCounter value={2.1} />%</span>
                 </div>
                 <p className="text-sm text-gray-500">Total cost of spoilage & returns</p>
              </div>

              <div className="space-y-3">
                  {wasteItemsData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl">
                          <div className="flex items-center gap-3">
                             <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.iconBg} ${item.iconColor}`}>
                                {item.icon}
                             </div>
                             <div>
                                <p className="text-sm font-bold text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.count}</p>
                             </div>
                          </div>
                          <p className="font-bold text-gray-900"><AnimatedCounter value={item.value} /></p>
                      </div>
                  ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SalesOverview;