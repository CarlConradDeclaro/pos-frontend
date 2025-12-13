import React, { useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiChevronRight,
  FiEdit,
  FiTrash2,
  FiCamera,
  FiSave,
  FiX,
} from "react-icons/fi";
import { GoDotFill } from "react-icons/go";

// --- 1. Types & Interfaces ---

interface MenuItem {
  id: string;
  name: string;
  category: string;
  ingredients: string;
  price: number;
  image: string;
}

interface RecipeIngredient {
  id: string;
  name: string;
  qty: number;
  unit: string;
  costPerUnit: number;
}

// --- 2. Sample Data ---

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    category: "Mains",
    ingredients: "Beef, Cheese, Lettuce, Tomato",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    name: "Margherita Pizza",
    category: "Mains",
    ingredients: "Tomato Sauce, Mozzarella, Basil",
    price: 14.5,
    image: "https://placehold.co/100x100/orange/white?text=Pizza",
  },
  {
    id: "3",
    name: "Spicy Wings (6pc)",
    category: "Starters",
    ingredients: "Chicken, Hot Sauce, Blue Cheese",
    price: 9.0,
    image: "https://placehold.co/100x100/red/white?text=Wings",
  },
  {
    id: "4",
    name: "Caesar Salad",
    category: "Starters",
    ingredients: "Romaine, Croutons, Parmesan",
    price: 10.5,
    image: "https://placehold.co/100x100/green/white?text=Salad",
  },
];

const initialIngredients: RecipeIngredient[] = [
  {
    id: "r1",
    name: "Beef Patty (Premium 150g)",
    qty: 1,
    unit: "Unit",
    costPerUnit: 2.5,
  },
  { id: "r2", name: "Brioche Bun", qty: 1, unit: "Unit", costPerUnit: 0.6 },
  {
    id: "r3",
    name: "Cheddar Cheese Slice",
    qty: 2,
    unit: "Slice",
    costPerUnit: 0.2,
  }, // 0.20 * 2 = 0.40
  {
    id: "r4",
    name: "Tomato (Roma)",
    qty: 0.5,
    unit: "Whole",
    costPerUnit: 0.4,
  }, // 0.40 * 0.5 = 0.20
  { id: "r5", name: "Special Sauce", qty: 15, unit: "ml", costPerUnit: 0.01 }, // 0.01 * 15 = 0.15
];

// --- 3. Main Component ---

const MenuRecipeBuilder: React.FC = () => {
  const [activeItemId, setActiveItemId] = useState<string>("1");
  const [ingredients, setIngredients] =
    useState<RecipeIngredient[]>(initialIngredients);

  // Form State
  const [itemName, setItemName] = useState("Classic Burger");
  const [category, setCategory] = useState("Mains");
  const [price, setPrice] = useState("12.99");
  const [description, setDescription] = useState(
    "Juicy beef patty topped with melted cheddar cheese, fresh lettuce, tomato slices, and our signature sauce on a toasted brioche bun."
  );

  // Calculated Values
  const totalCost = ingredients.reduce(
    (sum, item) => sum + item.qty * item.costPerUnit,
    0
  );
  const sellingPrice = parseFloat(price) || 0;
  const margin =
    sellingPrice > 0 ? ((sellingPrice - totalCost) / sellingPrice) * 100 : 0;

  // Handlers
  const handleQtyChange = (id: string, newQty: string) => {
    const val = parseFloat(newQty);
    setIngredients((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: isNaN(val) ? 0 : val } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans flex flex-col md:flex-row gap-6">
      {/* LEFT SIDEBAR: Menu List */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Menu Items</h2>

          {/* Search & Add */}
          <div className="relative mb-3">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors"
            />
          </div>
          <button className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors">
            <FiPlus size={18} /> Add New Menu Item
          </button>
        </div>

        {/* List Items */}
        <div className="space-y-3">
          {menuItems.map((item) => {
            const isActive = item.id === activeItemId;
            return (
              <div
                key={item.id}
                onClick={() => setActiveItemId(item.id)}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  isActive
                    ? "bg-green-50 border-green-500 shadow-sm ring-1 ring-green-500"
                    : "bg-white border-white hover:border-gray-200 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 truncate w-40">
                      {item.category} • {item.ingredients}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                  {isActive && <FiChevronRight className="text-green-600" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT SIDE: Edit Form */}
      <div className="w-full md:w-2/3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
        {/* Header Actions */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <FiEdit className="text-gray-400" /> Edit Item Details
          </h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded hover:bg-gray-50">
              Duplicate
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-red-500 border border-red-100 bg-red-50 rounded hover:bg-red-100">
              Delete Item
            </button>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {/* Top Section: Basic Info */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Image Upload */}
            <div className="shrink-0 group relative w-32 h-32 rounded-xl bg-orange-100 flex items-center justify-center overflow-hidden cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop"
                alt="Current"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <FiCamera size={24} />
                <span className="text-xs font-medium mt-1">Change</span>
              </div>
            </div>

            {/* Text Inputs */}
            <div className="flex-1 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                    Item Name
                  </label>
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:border-green-500"
                  >
                    <option>Mains</option>
                    <option>Starters</option>
                    <option>Desserts</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                    Selling Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full pl-6 p-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-green-500 resize-none"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100 mb-8" />

          {/* Recipe Section */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Recipe & Raw Materials
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Define components to automatically deduct from inventory.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 px-4 flex gap-6">
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Total Cost
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    ${totalCost.toFixed(2)}
                  </p>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Margin
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      margin >= 70 ? "text-green-500" : "text-orange-500"
                    }`}
                  >
                    {margin.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Recipe Table */}
            <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] uppercase text-gray-400 font-bold">
                  <tr>
                    <th className="px-4 py-3">Raw Material Name</th>
                    <th className="px-4 py-3 w-24">Qty / Serv</th>
                    <th className="px-4 py-3 w-20">Unit</th>
                    <th className="px-4 py-3 w-24 text-right">Est. Cost</th>
                    <th className="px-4 py-3 w-16 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {ingredients.map((item) => (
                    <tr key={item.id} className="group hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-700 flex items-center gap-2">
                        <GoDotFill className="text-green-500 text-[8px]" />
                        {item.name}
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            handleQtyChange(item.id, e.target.value)
                          }
                          className="w-16 p-1 border border-gray-200 rounded text-center text-sm focus:outline-none focus:border-green-500"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {item.unit}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-bold text-right">
                        ${(item.qty * item.costPerUnit).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="text-gray-300 hover:text-red-500 transition-colors">
                          <FiTrash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Add Ingredient Footer */}
              <div className="p-3 bg-gray-50 border-t border-gray-100 flex gap-2">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search inventory to add (e.g. Pickles)"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:border-green-500"
                  />
                </div>
                <button className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md flex items-center gap-2">
                  <FiPlus /> Add Ingredient
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-white rounded-b-xl">
          <button className="px-6 py-2 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Discard Changes
          </button>
          <button className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 shadow-sm flex items-center gap-2 transition-colors">
            <FiSave /> Save Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuRecipeBuilder;
