import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

// Define the Order interface
export interface Order {
  _id: string;
  date: string;
  time: string;
  status: "Preparing" | "Ready" | "Completed" | "Pending" | "Canceled";
  total: number;
}

// Sample data based on the image
// const ordersData: Order[] = [
//   {
//     _id: "#ORD-089",
//     date: "Today",
//     time: "10:42 AM",
//     status: "Preparing",
//     total: 45.5,
//   },
//   {
//     _id: "#ORD-088",
//     date: "Today",
//     time: "10:15 AM",
//     status: "Ready",
//     total: 128.0,
//   },
//   {
//     _id: "#ORD-087",
//     date: "Today",
//     time: "09:55 AM",
//     status: "Completed",
//     total: 24.9,
//   },
//   {
//     _id: "#ORD-086",
//     date: "Yesterday",
//     time: "08:30 PM",
//     status: "Pending",
//     total: 65.2,
//   },
//   {
//     _id: "#ORD-085",
//     date: "Yesterday",
//     time: "07:45 PM",
//     status: "Canceled",
//     total: 15.0,
//   },
//   {
//     _id: "#ORD-084",
//     date: "Yesterday",
//     time: "06:20 PM",
//     status: "Completed",
//     total: 89.5,
//   },
// ];

// Tabs for filtering orders
const tabs = [
  "All Orders",
  "Pending",
  "Preparing",
  "Ready to Serve",
  "Completed",
  "Canceled",
];

// Component to render the status badge with appropriate styling
const StatusBadge: React.FC<{ status: Order["status"] }> = ({ status }) => {
  let bgColor = "";
  let textColor = "";
  let dotColor = "";

  switch (status) {
    case "Preparing":
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      dotColor = "bg-yellow-400";
      break;
    case "Ready":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      dotColor = "bg-green-400";
      break;
    case "Completed":
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
      dotColor = "bg-blue-400";
      break;
    case "Pending":
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
      dotColor = "bg-gray-400";
      break;
    case "Canceled":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      dotColor = "bg-red-400";
      break;
    default:
      bgColor = "bg-gray-100";
      textColor = "text-gray-800";
      dotColor = "bg-gray-400";
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${dotColor}`}></span>
      {status}
    </span>
  );
};

// Main CustomerOrders Component
const CustomerOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [ordersData, setOrdersData] = useState<Order[]>([]);

  // Helper for formatting currency
  const formatCurrency = (total: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(total);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await fetch("http://localhost:3000/api/product-orders/", {
          method: "GET",
        })
        const data = await result.json();

        if (!result.ok) {
          throw new Error(data.message);
        }

        console.log("Data value: ");
        console.log(data.data);
        data.data.map((order: any) => {
          console.log("calling data.data.map");

          const rawOrderDate = new Date(order.orderDate);
          const orderDate = rawOrderDate.toLocaleDateString();
          const orderTime = rawOrderDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          console.log("order date: ", orderDate);
          console.log("order time: ", orderTime);
          setOrdersData((previous) => {
            return [...previous, {
              _id: order._id,
              status: order.status,
              total: Number(order.total['$numberDecimal']),
              date: orderDate,
              time: orderTime
            }]
          })
        });
      } catch (err) {
        console.error(err);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans antialiased">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Customer Orders
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track all confirmed orders in real-time.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by Order ID, Staff..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>
          {/* Filter Button */}
          <button className="p-2 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <FiFilter className="h-5 w-5" />
          </button>
          {/* New Order Button */}
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <FiPlus className="-ml-1 mr-2 h-5 w-5" />
            New Order
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-6">
        <nav className="flex space-x-2 overflow-x-auto pb-2" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 font-mediumtext-sm rounded-md whitespace-nowrap ${activeTab === tab
                ? "bg-green-500 text-white"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Orders Table Section */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date & Time
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                total
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ordersData.map((order, index) => (
              <tr
                key={order._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="font-medium text-gray-900">{order.date}</div>
                  <div className="text-gray-500">{order.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(order.total)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {/* Actions column is empty in the design */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Section */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span>-
                <span className="font-medium">6</span> of{" "}
                <span className="font-medium">124</span> orders
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-green-50 border-green-500 text-green-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
                >
                  3
                </a>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrders;
