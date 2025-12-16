import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiCalendar,
  FiChevronDown,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiSend,
  FiSave,
} from "react-icons/fi";
import { BiStore } from "react-icons/bi";

// --- 1. Types & Interfaces ---

type StockStatus = "Good" | "Low" | "Critical";

interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  unit: string;
  image: string;
  currentStock: number;
  maxStock: number;
  status: StockStatus;
}

interface CartItem extends Product {
  orderQty: number;
}

// --- 2. Sample Data ---

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Beef Patty",
    category: "MEAT",
    sku: "BF-202",
    price: 45.0,
    unit: "pack",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop",
    currentStock: 12,
    maxStock: 100,
    status: "Critical",
  },
  {
    id: "2",
    name: "Pizza Dough",
    category: "BAKERY",
    sku: "PD-105",
    price: 0.85,
    unit: "ball",
    image: "https://placehold.co/200x200/orange/white?text=Dough",
    currentStock: 45,
    maxStock: 60,
    status: "Good",
  },
  {
    id: "3",
    name: "Red Bell Peppers",
    category: "VEG",
    sku: "VP-381",
    price: 4.5,
    unit: "kg",
    image: "https://placehold.co/200x200/green/white?text=Peppers",
    currentStock: 4.5,
    maxStock: 10,
    status: "Good", // Actually displayed as OK/Good in image but low number
  },
  {
    id: "4",
    name: "Whole Milk",
    category: "DAIRY",
    sku: "DA-112",
    price: 3.5,
    unit: "gal",
    image: "https://placehold.co/200x200/white/grey?text=Milk",
    currentStock: 8,
    maxStock: 40,
    status: "Low",
  },
  {
    id: "5",
    name: "All-Purpose Flour",
    category: "GRAIN",
    sku: "GR-812",
    price: 0.9,
    unit: "kg",
    image: "https://placehold.co/200x200/yellow/grey?text=Flour",
    currentStock: 5,
    maxStock: 50,
    status: "Critical",
  },
];

// --- 3. Helper Components ---

const StatusBadge: React.FC<{ status: StockStatus }> = ({ status }) => {
  if (status === "Good") return null; // Image doesn't show badge for good

  const colors = status === "Critical" ? "bg-red-500" : "bg-orange-400";
  return (
    <span
      className={`absolute top-3 right-3 ${colors} text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-sm`}
    >
      {status === "Critical" ? "Critical" : "Low Stock"}
    </span>
  );
};

const StockProgressBar: React.FC<{
  current: number;
  max: number;
  status: StockStatus;
}> = ({ current, max, status }) => {
  const percent = Math.min((current / max) * 100, 100);

  let color = "bg-green-500";
  let labelColor = "text-green-600";
  if (status === "Low") {
    color = "bg-orange-400";
    labelColor = "text-orange-500";
  }
  if (status === "Critical") {
    color = "bg-red-500";
    labelColor = "text-red-500";
  }

  return (
    <div className="mt-3">
      <div className="flex justify-between text-[10px] font-semibold mb-1 uppercase text-gray-400">
        <span>Stock Level</span>
        <span className={labelColor}>
          {status} ({current} left)
        </span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

// --- 4. Main Component ---

const RestockRawMaterials: React.FC = () => {
  // State to track order quantities mapping { productId: quantity }
  const [cart, setCart] = useState<{ [key: string]: number }>({
    "1": 5, // Pre-fill Beef Patty as per image
    "3": 10, // Pre-fill Peppers
  });

  const handleQuantityChange = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const newQty = Math.max(0, current + delta);
      const newCart = { ...prev, [id]: newQty };
      if (newQty === 0) delete newCart[id];
      return newCart;
    });
  };

  // Calculate Summary Data
  const selectedItems = sampleProducts
    .filter((p) => cart[p.id] > 0)
    .map((p) => ({
      ...p,
      orderQty: cart[p.id],
    }));

  const subtotal = selectedItems.reduce(
    (acc, item) => acc + item.price * item.orderQty,
    0
  );
  const totalCost = subtotal; // Add tax/shipping logic here if needed

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Restock Raw Materials
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Create new orders and manage supplier deliveries.
          </p>
        </div>

        {/* Supplier Dropdown */}
        <div className="w-full md:w-auto">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">
            Select Supplier
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BiStore className="text-gray-400" />
            </div>
            <select className="block w-full md:w-80 pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Fresh Farms Distribution (Default)</option>
              <option>Global Foods Inc.</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FiChevronDown className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT COLUMN: Product Grid */}
        <div className="flex-1">
          {/* Search Toolbar */}
          <div className="flex items-center justify-between mb-6 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for items to order..."
                className="w-full pl-10 pr-4 py-2 text-sm focus:outline-none"
              />
            </div>
            <div className="flex items-center pl-4 border-l border-gray-200 space-x-4 px-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <FiFilter />
              </button>
              <span className="text-sm font-medium text-green-600 cursor-pointer hover:underline">
                Quick Add by SKU
              </span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sampleProducts.map((product) => {
              const qty = cart[product.id] || 0;
              const activeClass =
                qty > 0
                  ? "ring-2 ring-green-500 border-transparent"
                  : "border-gray-200";

              return (
                <div
                  key={product.id}
                  className={`bg-white rounded-xl p-4 border shadow-sm relative transition-all duration-200 ${activeClass}`}
                >
                  <StatusBadge status={product.status} />

                  {/* Image & Main Info */}
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-32 h-32 object-contain rounded-md mb-2"
                    />
                    <div className="w-full flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-[10px] text-gray-500 uppercase font-semibold">
                          {product.category}{" "}
                          <span className="text-gray-300">|</span> {product.sku}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          per {product.unit}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stock Level */}
                  <StockProgressBar
                    current={product.currentStock}
                    max={product.maxStock}
                    status={product.status}
                  />

                  {/* Order Counter */}
                  <div className="mt-5 flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                      Order Qty
                    </span>
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1">
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-red-500 transition-colors"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="w-8 text-center font-bold text-gray-900">
                        {qty}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-green-600 transition-colors"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination (Visual only) */}
          <div className="mt-8 flex justify-between items-center text-xs text-gray-400">
            <span>Showing 5 of 45 items</span>
            <div className="flex gap-2">
              <span className="cursor-pointer hover:text-gray-800">&lt;</span>
              <span className="cursor-pointer hover:text-gray-800">&gt;</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary (Sidebar) */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-6">
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex items-center gap-2">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <BiStore size={20} />
              </div>
              <h2 className="font-bold text-gray-900">Order Summary</h2>
            </div>

            <div className="p-5 space-y-6">
              {/* Supplier Info */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <p className="text-[10px] uppercase font-bold text-green-600 mb-1">
                  Supplier
                </p>
                <p className="font-bold text-gray-900 text-sm">
                  Fresh Farms Distribution
                </p>
                <p className="text-xs text-gray-500">Acc: #88392-001</p>
              </div>

              {/* Item List */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <h3 className="text-sm font-bold text-gray-900">
                    Selected Items ({selectedItems.length})
                  </h3>
                  <button
                    onClick={() => setCart({})}
                    className="text-xs text-green-600 hover:text-green-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
                  {selectedItems.length === 0 && (
                    <p className="text-sm text-gray-400 italic text-center py-4">
                      No items selected.
                    </p>
                  )}
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt=""
                          className="w-8 h-8 rounded object-cover bg-gray-100"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.orderQty} {item.unit}s x $
                            {item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">
                          ${(item.price * item.orderQty).toFixed(2)}
                        </p>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, -item.orderQty)
                          }
                          className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal Line */}
                <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-sm font-bold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Date Picker */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                  Requested Delivery
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="block w-full pl-10 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 block">
                  Special Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="Gate code, receiving hours, etc."
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
                ></textarea>
              </div>

              {/* Footer Totals & Actions */}
              <div className="pt-2">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-sm font-medium text-gray-500">
                    Total Estimated Cost
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    ${totalCost.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors">
                    <FiSend /> Send Order to Supplier
                  </button>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors">
                      <FiSave /> Save Draft
                    </button>
                    <button className="px-4 py-2 text-red-500 font-medium hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestockRawMaterials;
