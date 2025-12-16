import React, { useState } from "react";
import {
  FiSearch,
  FiCalendar,
  FiDownload,
  FiPlus,
  FiFilter,
  FiMoreVertical,
  FiEye,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiArrowDown,
} from "react-icons/fi";

// --- 1. Types & Interfaces ---

type OrderStatus = "Sent" | "Draft" | "Received" | "Canceled" | "Confirmed";

interface Supplier {
  name: string;
  initials: string;
  colorClass: string; // Tailwind classes for avatar bg/text
}

interface Order {
  id: string;
  supplier: Supplier;
  orderDate: string;
  requestedDelivery: string;
  itemsCount: number;
  estCost: number;
  status: OrderStatus;
}

// --- 2. Sample Data ---

const sampleOrders: Order[] = [
  {
    id: "#PO-23-1024",
    supplier: {
      name: "Fresh Farms",
      initials: "FF",
      colorClass: "bg-green-100 text-green-700",
    },
    orderDate: "Oct 24, 2023",
    requestedDelivery: "Oct 26, 2023",
    itemsCount: 12,
    estCost: 450.25,
    status: "Sent",
  },
  {
    id: "#PO-23-1025",
    supplier: {
      name: "Metro Cash & Carry",
      initials: "MC",
      colorClass: "bg-blue-100 text-blue-700",
    },
    orderDate: "Oct 25, 2023",
    requestedDelivery: "Oct 27, 2023",
    itemsCount: 5,
    estCost: 120.0,
    status: "Draft",
  },
  {
    id: "#PO-23-1020",
    supplier: {
      name: "Sysco Foods",
      initials: "SF",
      colorClass: "bg-red-100 text-red-700",
    },
    orderDate: "Oct 20, 2023",
    requestedDelivery: "Oct 22, 2023",
    itemsCount: 45,
    estCost: 1250.0,
    status: "Received",
  },
  {
    id: "#PO-23-1018",
    supplier: {
      name: "Local Dairy Co-op",
      initials: "LD",
      colorClass: "bg-gray-100 text-gray-700",
    },
    orderDate: "Oct 15, 2023",
    requestedDelivery: "-",
    itemsCount: 8,
    estCost: 85.5,
    status: "Canceled",
  },
  {
    id: "#PO-23-1015",
    supplier: {
      name: "Artisan Pastries",
      initials: "AP",
      colorClass: "bg-purple-100 text-purple-700",
    },
    orderDate: "Oct 12, 2023",
    requestedDelivery: "Oct 14, 2023",
    itemsCount: 20,
    estCost: 340.0,
    status: "Confirmed",
  },
];

// --- 3. Helper Components ---

const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  let styles = "";
  switch (status) {
    case "Sent":
      styles = "bg-blue-50 text-blue-600 border border-blue-100";
      break;
    case "Draft":
      styles = "bg-yellow-50 text-yellow-600 border border-yellow-100";
      break;
    case "Received":
      styles = "bg-green-50 text-green-600 border border-green-100";
      break;
    case "Canceled":
      styles = "bg-gray-50 text-gray-500 border border-gray-100";
      break;
    case "Confirmed":
      styles = "bg-purple-50 text-purple-600 border border-purple-100";
      break;
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
};

const ActionButton: React.FC<{ status: OrderStatus }> = ({ status }) => {
  if (status === "Sent") {
    return (
      <button className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors">
        Receive
      </button>
    );
  }
  if (status === "Draft") {
    return (
      <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md transition-colors">
        Edit
      </button>
    );
  }
  // Default view icon for other statuses
  return (
    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md">
      <FiEye size={16} />
    </button>
  );
};

// --- 4. Main Component ---

const SupplierOrdersHistory: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Supplier Orders History
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track and manage past orders placed with your suppliers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <FiDownload /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors shadow-sm">
            <FiPlus /> Create New Order
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filters Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 lg:w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            {/* Date Range */}
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50 whitespace-nowrap">
              <FiCalendar /> Last 30 Days{" "}
              <FiChevronDown className="text-gray-400" />
            </button>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto">
            {/* Supplier Filter */}
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 text-gray-600 text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer">
                <option>All Suppliers</option>
                <option>Fresh Farms</option>
                <option>Sysco Foods</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 text-gray-600 text-sm rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer">
                <option>All Statuses</option>
                <option>Sent</option>
                <option>Received</option>
                <option>Draft</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold border-b border-gray-100">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Supplier</th>
                <th className="px-6 py-4 flex items-center gap-1 cursor-pointer hover:text-gray-700">
                  Order Date <FiArrowDown />
                </th>
                <th className="px-6 py-4">Requested Delivery</th>
                <th className="px-6 py-4 text-center">Items</th>
                <th className="px-6 py-4 text-right">Est. Cost</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sampleOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4 text-sm font-bold text-gray-700">
                    {order.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${order.supplier.colorClass}`}
                      >
                        {order.supplier.initials}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {order.supplier.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.requestedDelivery}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium text-center">
                    {order.itemsCount}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                    ${order.estCost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <ActionButton status={order.status} />
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-md">
                        <FiMoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">1-5</span> of{" "}
            <span className="font-bold text-gray-900">48</span> orders
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-500 text-sm font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierOrdersHistory;
