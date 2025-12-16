import React, { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiFilter,
  FiChevronDown,
  FiEdit2,
  FiTrash2,
  FiX,
  FiMoreHorizontal,
  FiSliders,
  FiShoppingCart,
} from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

// --- 1. Data Interfaces & Types ---

export type StockStatusType = "Good" | "Low Stock" | "Critical";

// Basic data displayed in the table
export interface RawMaterialSummary {
  id: string;
  name: string;
  sku: string;
  image: string;
  stockCurrent: number;
  stockTarget: number;
  category: string;
  unit: string;
  cost: number;
  status: StockStatusType;
}

// Additional data needed for the sidebar
export interface CorrelatedItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitLabel: string;
  initials: string;
  bgColorClass: string;
  textColorClass: string;
}

export interface Activity {
  id: string;
  dateStr: string;
  timeStr: string;
  type: "reduction" | "restock";
  amount: number;
  unit: string;
  detail: string;
}

// The full detailed object combining summary + extra details
export interface MaterialFullDetails extends RawMaterialSummary {
  reorderPoint: number;
  correlatedItems: CorrelatedItem[];
  recentActivity: Activity[];
}

// --- 2. Sample Data (Based on the Image) ---

// Helper for image placeholders
const getPlaceholderImg = (text: string) =>
  `https://placehold.co/100x100/png?text=${text.split(" ")[0]}`;

const sampleInventory: MaterialFullDetails[] = [
  {
    id: "1",
    name: "Beef Patty",
    sku: "BF-202",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop", // Using unsplash for the hero item
    stockCurrent: 12,
    stockTarget: 80,
    category: "Meat",
    unit: "Packs",
    cost: 45.0,
    status: "Low Stock",
    reorderPoint: 20,
    correlatedItems: [
      {
        id: "c1",
        name: "Classic Burger",
        category: "Main Course",
        quantity: 1,
        unitLabel: "PER UNIT",
        initials: "CB",
        bgColorClass: "bg-orange-100",
        textColorClass: "text-orange-600",
      },
      {
        id: "c2",
        name: "Double Trouble",
        category: "Main Course",
        quantity: 2,
        unitLabel: "PER UNIT",
        initials: "DT",
        bgColorClass: "bg-red-100",
        textColorClass: "text-red-600",
      },
    ],
    recentActivity: [
      {
        id: "a1",
        dateStr: "TODAY",
        timeStr: "10:23 AM",
        type: "reduction",
        amount: 24,
        unit: "packs",
        detail: "Sales deduction",
      },
      {
        id: "a2",
        dateStr: "YESTERDAY",
        timeStr: "08:00 AM",
        type: "restock",
        amount: 50,
        unit: "packs",
        detail: "Purchase Order #492",
      },
    ],
  },
  {
    id: "2",
    name: "Pizza Dough",
    sku: "PD-105",
    image: getPlaceholderImg("Dough"),
    stockCurrent: 45,
    stockTarget: 60,
    category: "Bakery",
    unit: "Balls",
    cost: 0.85,
    status: "Good",
    reorderPoint: 10,
    correlatedItems: [],
    recentActivity: [],
  },
  {
    id: "3",
    name: "Red Bell Peppers",
    sku: "VP-301",
    image: getPlaceholderImg("Pepper"),
    stockCurrent: 4.5,
    stockTarget: 8,
    category: "Vegetable",
    unit: "Kg",
    cost: 4.5,
    status: "Good",
    reorderPoint: 2,
    correlatedItems: [],
    recentActivity: [],
  },
  {
    id: "4",
    name: "Whole Milk",
    sku: "DA-112",
    image: getPlaceholderImg("Milk"),
    stockCurrent: 8,
    stockTarget: 40,
    category: "Dairy",
    unit: "Gallons",
    cost: 3.5,
    status: "Low Stock",
    reorderPoint: 10,
    correlatedItems: [],
    recentActivity: [],
  },
  {
    id: "5",
    name: "Basmati Rice",
    sku: "GR-004",
    image: getPlaceholderImg("Rice"),
    stockCurrent: 50,
    stockTarget: 55,
    category: "Grain",
    unit: "Kg",
    cost: 2.0,
    status: "Good",
    reorderPoint: 5,
    correlatedItems: [],
    recentActivity: [],
  },
  {
    id: "6",
    name: "All-Purpose Flour",
    sku: "GR-012",
    image: getPlaceholderImg("Flour"),
    stockCurrent: 5,
    stockTarget: 50,
    category: "Grain",
    unit: "Kg",
    cost: 0.9,
    status: "Critical",
    reorderPoint: 15,
    correlatedItems: [],
    recentActivity: [],
  },
  {
    id: "7",
    name: "Coffee Beans",
    sku: "BV-500",
    image: getPlaceholderImg("Coffee"),
    stockCurrent: 12.0,
    stockTarget: 15,
    category: "Beverage",
    unit: "Kg",
    cost: 22.0,
    status: "Good",
    reorderPoint: 3,
    correlatedItems: [],
    recentActivity: [],
  },
];

// --- 3. Helper Components (Badges, Progress Bars) ---

const StatusBadge: React.FC<{ status: StockStatusType }> = ({ status }) => {
  const styles = {
    Good: "bg-green-100 text-green-700 icon-green-500",
    "Low Stock": "bg-orange-100 text-orange-700 icon-orange-500",
    Critical: "bg-red-100 text-red-700 icon-red-500",
  };
  const colors = styles[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${colors}`}
    >
      {status === "Good" && <IoMdTime className="text-[8px] text-green-500" />}
      {status === "Low Stock" && (
        <span className="text-orange-500 font-bold">!</span>
      )}
      {status === "Critical" && (
        <FiX className="text-[10px] p-[1px] bg-red-500 text-white rounded-full" />
      )}
      {status}
    </span>
  );
};

const ProgressBar: React.FC<{
  current: number;
  target: number;
  status: StockStatusType;
  height?: string;
}> = ({ current, target, status, height = "h-1.5" }) => {
  const percentage = Math.min((current / target) * 100, 100);
  let barColor = "bg-green-500";
  if (status === "Low Stock") barColor = "bg-orange-400";
  if (status === "Critical") barColor = "bg-red-500";

  return (
    <div
      className={`w-full bg-gray-200 rounded-full overflow-hidden ${height}`}
    >
      <div
        className={`${height} ${barColor} rounded-full`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

// --- 4. The Sidebar Component (Details View) ---

interface MaterialSidebarProps {
  material: MaterialFullDetails | null;
  onClose: () => void;
}

const MaterialSidebar: React.FC<MaterialSidebarProps> = ({
  material,
  onClose,
}) => {
  if (!material) return null;

  const percentage = Math.round(
    (material.stockCurrent / material.stockTarget) * 100
  );
  const isLow = material.stockCurrent <= material.reorderPoint;

  return (
    <div className="fixed inset-y-0 right-0 w-[400px] bg-white shadow-2xl border-l border-gray-100 z-50 overflow-y-auto transition-transform duration-300 ease-in-out transform translate-x-0">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">
          Material Details
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <FiX size={20} />
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center">
          <img
            src={material.image}
            alt={material.name}
            className="w-32 h-32 rounded-2xl object-cover mb-4 shadow-sm"
          />
          <div className="flex justify-end w-full -mt-8 mb-2 px-4">
            <FiMoreHorizontal className="text-gray-400 cursor-pointer" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{material.name}</h3>
          <p className="text-sm text-gray-500 mb-3">
            {material.category} • SKU: {material.sku}
          </p>
          <StatusBadge status={material.status} />
        </div>

        {/* Current Stock Section */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase">
              Current Stock
            </span>
            {isLow && (
              <span className="text-xs text-red-500 flex items-center gap-1">
                <GoDotFill /> Below Limit
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-bold text-gray-900">
              {material.stockCurrent}
            </span>
            <span className="text-gray-500">{material.unit.toLowerCase()}</span>
          </div>
          {isLow && (
            <p className="text-xs text-gray-400 mb-3">
              Reorder Point: {material.reorderPoint}
            </p>
          )}

          <ProgressBar
            current={material.stockCurrent}
            target={material.stockTarget}
            status={material.status}
            height="h-2"
          />
          <p className="text-xs text-center text-gray-500 mt-2">
            You have{" "}
            <span
              className={
                isLow
                  ? "text-red-500 font-medium"
                  : "text-green-500 font-medium"
              }
            >
              {percentage}%
            </span>{" "}
            of your target stock ({material.stockTarget}{" "}
            {material.unit.toLowerCase()}).
          </p>
        </div>

        {/* Correlated Menu Items */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              <FiFilter className="text-green-500" /> Correlated Menu Items
            </h4>
            <button className="text-xs text-green-500 font-medium hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {material.correlatedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${item.bgColorClass} ${item.textColorClass} font-bold text-sm`}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">
                    {item.quantity}x
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase">
                    {item.unitLabel}
                  </p>
                </div>
              </div>
            ))}
            {material.correlatedItems.length === 0 && (
              <p className="text-sm text-gray-400">
                No correlated items found.
              </p>
            )}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <IoMdTime className="text-gray-400" size={18} /> Recent Activity
          </h4>
          <div className="space-y-6 pl-2">
            {material.recentActivity.map((activity, index) => (
              <div
                key={activity.id}
                className="relative pl-6 border-l border-gray-200 last:border-0 pb-4"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${
                    activity.type === "reduction"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                ></div>

                <p className="text-xs text-gray-400 mb-1">
                  <span className="font-medium uppercase text-gray-600">
                    {activity.dateStr}
                  </span>
                  , {activity.timeStr}
                </p>
                <p className="text-sm text-gray-800">
                  Stock{" "}
                  {activity.type === "reduction" ? "reduced" : "restocked"} by{" "}
                  <span
                    className={
                      activity.type === "reduction"
                        ? "text-red-500 font-medium"
                        : "text-green-500 font-medium"
                    }
                  >
                    {activity.amount} {activity.unit}
                  </span>
                </p>
                <p className="text-xs text-gray-500">{activity.detail}</p>
              </div>
            ))}
            {material.recentActivity.length === 0 && (
              <p className="text-sm text-gray-400 pl-6">No recent activity.</p>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Footer Actions */}
      <div className="sticky bottom-0 bg-white p-6 border-t border-gray-100 flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
          <FiSliders /> Adjust
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors shadow-sm">
          <FiShoppingCart /> Order Stock
        </button>
      </div>
    </div>
  );
};

// --- 5. Main Dashboard View ---

const RawMaterialInventoryDashboard: React.FC = () => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(
    null
  );

  // Function to get full details based on ID (in a real app, this might be an API call)
  const selectedMaterial =
    sampleInventory.find((item) => item.id === selectedMaterialId) || null;

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative overflow-x-hidden">
      {/* Overlay for Sidebar */}
      {selectedMaterialId && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity"
          onClick={() => setSelectedMaterialId(null)}
        ></div>
      )}

      <div
        className={`max-w-7xl mx-auto transition-all duration-300 ${
          selectedMaterialId ? "mr-[400px]" : ""
        }`}
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Raw Material Inventory
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage stock levels, reorders, and track ingredient usage.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, category, or SKU..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm"
              />
            </div>
            <button className="p-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm">
              <FiPlus size={20} />
            </button>
          </div>
        </div>

        {/* Filters and Actions Bar */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-lg mb-4 md:mb-0">
            <button className="px-4 py-1.5 text-sm font-medium bg-white text-gray-900 rounded-md shadow-sm">
              All Materials
            </button>
            <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1">
              Low Stock <GoDotFill className="text-red-500 text-[8px]" />
            </button>
            <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1">
              Good Stock <GoDotFill className="text-green-500 text-[8px]" />
            </button>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>SORT BY</span>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
              Stock Level <FiChevronDown />
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Raw Material
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Stock Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Unit
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sampleInventory.map((item) => {
                const percentage = Math.round(
                  (item.stockCurrent / item.stockTarget) * 100
                );
                // Highlight the row if it's selected
                const isSelected = item.id === selectedMaterialId;
                const rowClasses = `hover:bg-gray-50 transition-colors cursor-pointer ${
                  isSelected ? "bg-green-50" : ""
                }`;

                return (
                  <tr
                    key={item.id}
                    className={rowClasses}
                    onClick={() => setSelectedMaterialId(item.id)}
                  >
                    {/* Raw Material Cell */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                        />
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            SKU: {item.sku}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Stock Status Cell */}
                    <td className="px-6 py-4" style={{ minWidth: "200px" }}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-gray-900">
                          {item.stockCurrent}{" "}
                          <span className="text-gray-400">
                            / {item.stockTarget}
                          </span>
                        </span>
                        <span
                          className={`font-medium ${
                            item.status !== "Good"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {percentage}%
                        </span>
                      </div>
                      <ProgressBar
                        current={item.stockCurrent}
                        target={item.stockTarget}
                        status={item.status}
                      />
                    </td>

                    {/* Other Cells */}
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.unit}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      ${item.cost.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={item.status} />
                    </td>

                    {/* Actions Cell (Stop propagation so clicking buttons doesn't open sidebar) */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Simple Pagination Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
            <p>
              Showing <span className="font-medium text-gray-900">1-7</span> of{" "}
              <span className="font-medium text-gray-900">45</span> items
            </p>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border border-gray-200 bg-white rounded hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                &lt;
              </button>
              <button className="px-3 py-1 border border-green-500 bg-green-50 text-green-600 rounded font-medium">
                1
              </button>
              <button className="px-3 py-1 border border-gray-200 bg-white rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-200 bg-white rounded hover:bg-gray-50">
                3
              </button>
              <span>...</span>
              <button className="px-3 py-1 border border-gray-200 bg-white rounded hover:bg-gray-50">
                8
              </button>
              <button className="px-3 py-1 border border-gray-200 bg-white rounded hover:bg-gray-50">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render Sidebar Component */}
      <MaterialSidebar
        material={selectedMaterial}
        onClose={() => setSelectedMaterialId(null)}
      />
    </div>
  );
};

export default RawMaterialInventoryDashboard;
