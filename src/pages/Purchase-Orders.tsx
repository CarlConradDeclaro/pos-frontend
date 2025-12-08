import React, { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  Plus,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Package,
  Clock,
} from "lucide-react";
import type { PurchaseOrder } from "../types/PurchaseOrder";
import { initialOrders } from "../data/initialOrders";
import type { POStatus } from "../types/Postatus";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helper/format-date";

// 1. Define Data Types

const PurchaseOrders: React.FC = () => {
  const [po, setPO] = useState<PurchaseOrder[] | null>(null);
  useEffect(() => {
    const fetchPOs = async () => {
      try {
        const res = await fetch("http://127.0.0.1:3000/api/purchase-orders");
        const data = await res.json();
        setPO(data.data);
        console.log("data: ", data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPOs();
  }, []);

  // const [orders] = useState<PurchaseOrder[]>(po);
  // Helper to render status badges with correct colors
  const getStatusStyles = (status: POStatus) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "Confirmed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Draft":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };
  const navigate = useNavigate();

  const handleViewDetail = (id: string) => {
    navigate(`/po-details/${id}`);
  };

  return (
    <div className="flex justify-center  h-screen  p-6">
      {/* Products Column */}
      <div className="flex-1   p-6 rounded-xl mr-6 flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage Purchase Orders
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              View, filter, and manage all your purchase orders in one place.
            </p>
          </div>
          <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-4 py-2 rounded-md transition-colors shadow-sm active:bg-yellow-600">
            <Plus size={18} />
            Create New PO
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl  shadow-sm border border-gray-100 flex flex-col">
          {/* Filters Bar */}
          <div className="p-4 md:p-6 border-b border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
              {/* Search */}
              <div className="sm:col-span-2 lg:col-span-5 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by PO number or supplier..."
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm text-gray-700 transition-shadow outline-none"
                />
              </div>

              {/* Supplier Dropdown */}
              <div className="lg:col-span-3 relative">
                <select className="block w-full pl-3 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm text-gray-600 appearance-none bg-white outline-none">
                  <option>All Suppliers</option>
                  <option>Metro Meats Inc.</option>
                  <option>Fresh Produce Co.</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                />
              </div>

              {/* Status Dropdown */}
              <div className="lg:col-span-2 relative">
                <select className="block w-full pl-3 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm text-gray-600 appearance-none bg-white outline-none">
                  <option>All Statuses</option>
                  <option>Delivered</option>
                  <option>Pending</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                />
              </div>

              {/* Date Picker */}
              <div className="sm:col-span-2 lg:col-span-2 relative">
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="block w-full pl-3 pr-10 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-sm text-gray-600 outline-none"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP/TABLET VIEW: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500">
                    PO Number
                  </th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 cursor-pointer group hover:bg-gray-50">
                    <div className="flex items-center gap-1">
                      Supplier Name
                      <div className="flex flex-col">
                        <ChevronUp size={10} className="text-gray-300" />
                        <ChevronDown size={10} className="text-gray-300" />
                      </div>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-1">
                      Status
                      <div className="flex flex-col">
                        <ChevronUp size={10} className="text-gray-300" />
                        <ChevronDown size={10} className="text-gray-300" />
                      </div>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 text-center">
                    Total Items
                  </th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-1">
                      Order Date
                      <div className="flex flex-col">
                        <ChevronUp size={10} className="text-gray-300" />
                        <ChevronDown size={10} className="text-gray-300" />
                      </div>
                    </div>
                  </th>
                  <th className="py-4 px-6 text-sm font-semibold text-gray-500"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {po
                  ?.slice()
                  .reverse()
                  .map((order) => (
                    <tr
                      onClick={() => handleViewDetail(order._id)}
                      key={order._id}
                      className="hover:bg-gray-50 transition-colors group cursor-pointer"
                    >
                      <td className="py-4 px-6 text-sm font-medium text-gray-900">
                        {order.poNumber}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {order.supplierName}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 text-center">
                        {order.products.length} items
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {formatDate(order.orderDate)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Morehorizontal clicked");
                          }}
                        >
                          <MoreHorizontal size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW: Card List */}
          <div className="md:hidden flex flex-col divide-y divide-gray-100">
            {po?.map((order) => (
              <div
                key={order._id}
                className="p-4 flex flex-col gap-3 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">
                      {order.poNumber}
                    </span>
                    <span className="text-sm text-gray-600 mt-0.5">
                      {order.supplierName}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 p-1 -mt-1 -mr-2">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Package size={14} />
                      {order.totalItems} items
                    </div>
                    {order.orderDate !== "-" && (
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {formatDate(order.orderDate)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Optional: Footer Spacer */}
          <div className="h-2 bg-gray-50 md:bg-transparent rounded-b-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrders;
