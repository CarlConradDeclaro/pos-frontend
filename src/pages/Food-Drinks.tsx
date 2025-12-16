import { useState, useEffect } from "react";
import { Search, ArrowLeftRight, Loader2 } from "lucide-react";
import ProductCard from "../components/Food-Drinks/ProductCard";
import PosSummaryItem from "../components/Food-Drinks/PosSummaryItem";
import CategoryButon from "../components/Food-Drinks/CategoryButton";
import ConfirmPoModal from "../components/Food-Drinks/ConfirmPoModal";

export interface Product {
  id: number;
  name: string;
  price: number;
  unit: string;
  imageAlt?: string;
  imageUrl?: string;
  category?: string;
}

export interface PurchaseOrderItem {
  id: number;
  name: string;
  quantity: number;
  total: number;
  imageUrl: string;
  imageAlt: string;
}

// Data for the Product Grid
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Classic Beef Burger",
    category: "Ulam",
    price: 32.0,
    imageUrl: "salad.jpg",
    unit: "/pc",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    category: "Ulam",
    price: 14.0,
    imageUrl: "salad.jpg",
    unit: "/pc",
  },
  {
    id: 3,
    name: "Sparkling Cola",
    category: "drink",
    price: 8.0,
    imageUrl: "salad.jpg",
    unit: "/pc",
  },
  {
    id: 4,
    name: "Garlic Bread Basket",
    category: "side",
    price: 64.99,
    imageUrl: "salad.jpg",
    unit: "/pc",
  },
  {
    id: 5,
    name: "Garden Salad",
    category: "side",
    price: 59.99,
    imageUrl: "salad.jpg",
    unit: "/pc",
  },
  {
    id: 6,
    name: "Artisan Cheese Platter",
    category: "side",
    price: 69.99,
    imageUrl: "salad.jpg",
    unit: "/pc",
  },
  {
    id: 7,
    name: "Spicy Chicken Wings",
    category: "main",
    price: 69.99,
    imageUrl: "salad.jpg",
    unit: "/pc",
  },
  {
    id: 8,
    name: "New York Cheesecake",
    category: "dessert",
    price: 74.99,
    imageUrl: "salad.jpg",
    unit: "/pc",
  },
  {
    id: 9,
    name: "Orange Juice",
    category: "drink",
    price: 59.99,
    imageUrl: "salad.jpg",
    unit: "/pc",
  },
  {
    id: 10,
    name: "Garlic Mashed Potatoes",
    category: "side",
    price: 59.99,
    imageUrl: "tacos.jpg",
    unit: "/pc",
  },
  {
    id: 11,
    name: "Fish and Chips",
    category: "main",
    price: 59.99,
    imageUrl: "tacos.jpg",
    unit: "/pc",
  },
];

const categories = ["All", "Ulam", "Silog", "Sisig", "Drinks", "Dessert"];

// Helper to find a product in MOCK_PRODUCTS by name
const findProductByName = (name: string): Product | undefined => {
  return MOCK_PRODUCTS.find((p) => p.name === name);
};

const PosScreen = () => {
  const [subtotalAmount, setSubtotalAmount] = useState(0.0);
  const [taxAmount, setTaxAmount] = useState(0.0);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [searchedWord, setSearchedWord] = useState("");
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(MOCK_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [poItems, setPoItems] = useState<Map<string, PurchaseOrderItem>>(
    new Map()
  );
  const [isModalActive, setIsModalActive] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const [isAiThinking, setIsAiThinking] = useState(false);

  type Recommendation = {
    name: string;
    price: number;
    reason: string;
  };

  type RecommendMenu = {
    original_order: string[];
    recommendations: Recommendation[];
  };
  const [recommend_menu, setRecommended_menu] = useState<RecommendMenu | null>(
    null
  );

  const CategoryGroup = () => {
    const handleCategoryClick = (categoryName: string) => {
      setActiveCategory(categoryName);
    };

    return (
      <div className="flex space-x-2 mb-6 pb-2">
        {categories.map((category) => (
          <CategoryButon
            key={category}
            name={category}
            isActive={category === activeCategory}
            onClickFunc={handleCategoryClick}
          />
        ))}
      </div>
    );
  };

  const handlePoItems = (product: Product, quantity: number) => {
    setPoItems((previousMap) => {
      const newMap = new Map(previousMap);

      const existingItem = newMap.get(product.name);

      if (quantity <= 0) {
        newMap.delete(product.name);
      } else {
        const itemToUpdate = existingItem || {
          id: product.id,
          name: product.name,
          // Use product's actual image if available, fallback if not
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
          imageAlt: product.name,
        };

        newMap.set(product.name, {
          ...itemToUpdate,
          quantity: quantity,
          total: product.price * quantity,
        });
      }

      return newMap;
    });
  };

  const handleDeletePosItem = (product: string) => {
    setPoItems((previous) => {
      const newMap = new Map(previous);
      newMap.delete(product);
      return newMap;
    });
  };

  const closeConfirmPoModal = () => {
    setIsModalActive(false);
  };

  // For filtering the products based on the clicked category and searchbar
  useEffect(() => {
    let newFilteredProducts = MOCK_PRODUCTS;
    if (activeCategory !== "All") {
      newFilteredProducts = MOCK_PRODUCTS.filter((product) => {
        return product.category === activeCategory;
      });
    }
    if (searchedWord.trim() !== "") {
      const lowerCaseSearch = searchedWord.toLowerCase();
      newFilteredProducts = MOCK_PRODUCTS.filter((product) => {
        return product.name.toLowerCase().includes(lowerCaseSearch);
      });
    }
    setFilteredProducts(newFilteredProducts);
  }, [activeCategory, searchedWord]);

  // === MODIFIED API CALL FUNCTION (No MOCK_RESPONSE) ===
  const get_recommend_menu = async (message: string) => {
    setIsAiThinking(true);
    setRecommended_menu(null);

    try {
      // 1. Send request to the actual backend API
      const response = await fetch("http://localhost:8000/api/agent/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Ensure data.reply is parsed correctly
      const jsonStart = data.reply.indexOf("{");
      if (jsonStart === -1) {
        throw new Error("No valid JSON found in reply");
      }

      const parsedReply: RecommendMenu = JSON.parse(
        data.reply.slice(jsonStart)
      );

      console.log("parsed output:", parsedReply);

      setRecommended_menu(parsedReply);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      // Fallback to empty recommendations on error
      setRecommended_menu({ original_order: [], recommendations: [] });
    } finally {
      setIsAiThinking(false);
    }
  };

  // For updating the subtotal, tax, and total amount when POS Items change
  useEffect(() => {
    let subtotal = 0;
    let totalQuantity = 0;
    poItems.forEach((item, _key) => {
      subtotal += item.total;
      totalQuantity += item.quantity;
    });

    const taxRate = 0.05; // 5% tax
    const calculatedTax = subtotal * taxRate;
    const calculatedTotal = subtotal + calculatedTax;

    setSubtotalAmount(subtotal);
    setTaxAmount(calculatedTax);
    setTotalAmount(calculatedTotal);
    setTotalItems(totalQuantity);
  }, [poItems]);

  // === useEffect TO TRIGGER RECOMMENDATIONS ===
  useEffect(() => {
    if (poItems.size > 0) {
      const items = [...poItems.keys()];
      get_recommend_menu(items.toString());
    } else {
      setRecommended_menu(null);
      setIsAiThinking(false);
    }
  }, [poItems]);

  return (
    <div className="flex justify-center h-screen bg-gray-50 p-6">
      {/* Products Column */}
      <div className="flex-1 max-w-[calc(100%-350px)] p-6 rounded-xl mr-6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between mb-6">
          <h1 className="w-5/12 text-2xl font-bold text-gray-800">
            Create Purchase Order
          </h1>

          <div className="flex justify-around gap-3 w-7/12 p-3 border border-gray-200 rounded-lg focus:ring-green-500">
            <Search />
            <input
              type="text"
              placeholder="Search product here..."
              className="h-full w-full bg-inherit focus:outline-none focus:ring-green-500"
              value={searchedWord}
              onChange={(e) => setSearchedWord(e.target.value)}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <CategoryGroup />

        {/* Product Grid */}
        <div className="w-full grid grid-cols-4 gap-6 overflow-y-auto pr-2">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              style=""
              product={product}
              imageLink={`https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg`}
              imageAlternative={product.name}
              currentQuantity={poItems.get(product.name)?.quantity || 0}
              handlePoItems={handlePoItems}
            />
          ))}
        </div>
      </div>

      {/* PO Summary Column */}
      <div className="w-[350px] bg-white p-6 rounded-xl shadow-lg flex flex-col">
        {/* === Header: Order Summary === */}
        <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
          Order Summary
        </h2>

        {/* === SCROLLABLE AREA: PO Items and AI Suggestions === */}
        <div className="flex-grow overflow-y-auto pr-2 mb-4">
          {/* 1. List of PO Items */}
          {poItems.size > 0 ? (
            <div className="space-y-3">
              {[...poItems.values()].map((item) => (
                <PosSummaryItem
                  key={item.id}
                  purchaseOrderItem={item}
                  handleDeleteItem={handleDeletePosItem}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-400 text-sm">
              No items in the order.
            </div>
          )}

          {/* 2. AI Suggestions Section - UPDATED DISPLAY LOGIC */}
          <div className="mt-6 pt-3 border-t border-gray-200">
            {isAiThinking ? (
              // Display "AI is analyzing..." indicator while loading
              <div className="flex items-center justify-center py-4 bg-purple-50 rounded-lg text-purple-600 font-semibold">
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                AI is analyzing your order...
              </div>
            ) : (
              // Display recommendations if available and not loading
              recommend_menu &&
              recommend_menu.recommendations.length > 0 && (
                <>
                  <div className="flex items-center mb-4">
                    <ArrowLeftRight className="w-5 h-5 mr-2 text-purple-600" />
                    <h3 className="text-md font-semibold text-purple-600">
                      AI Suggestions
                    </h3>
                    <span className="ml-auto text-xs text-gray-400">
                      Customers also bought...
                    </span>
                  </div>

                  {/* Recommendations Grid */}
                  <div className="flex gap-3 justify-start overflow-x-auto pb-2">
                    {recommend_menu.recommendations.map((item, index) => {
                      // Find the actual product data from the MOCK inventory
                      const inventoryProduct = findProductByName(item.name);

                      // Construct the Product object using full inventory data if found,
                      // otherwise use data from API response (item.price)
                      const product: Product = inventoryProduct
                        ? {
                            ...inventoryProduct,
                            id: inventoryProduct.id, // Use actual ID
                            // Use MOCK_PRODUCTS image if available, otherwise a placeholder
                            imageUrl:
                              "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
                            category: inventoryProduct.category,
                          }
                        : {
                            // Fallback for an item not found in MOCK_PRODUCTS
                            id: MOCK_PRODUCTS.length + index + 1, // Ensure unique ID
                            name: item.name,
                            price: item.price,
                            unit: "pcs",
                            imageAlt: item.name,
                            imageUrl:
                              "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
                            category: "Recommendation",
                          };

                      return (
                        // Adjusted width to w-[150px]
                        <div
                          key={product.id}
                          className="flex-shrink-0 w-[150px] relative"
                        >
                          {/* === AI INSIGHT BADGE === */}
                          <div className="absolute top-4 right-0 z-10 -mt-2 -mr-2 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full shadow-md transform rotate-3">
                            AI Insight
                          </div>
                          {/* === END BADGE === */}

                          <ProductCard
                            key={product.id}
                            style="w-full h-auto p-2"
                            product={product}
                            imageLink={product.imageUrl!}
                            imageAlternative={product.imageAlt!}
                            currentQuantity={
                              poItems.get(product.name)?.quantity || 0
                            }
                            handlePoItems={handlePoItems}
                          />
                          {/* Text details for the recommendation */}
                          <p className="text-center text-sm font-semibold mt-1 truncate">
                            {item.name}
                          </p>
                          <p className="text-center text-xs text-gray-500">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </>
              )
            )}
          </div>
          {/* === END AI Suggestions Section === */}
        </div>
        {/* === END SCROLLABLE AREA === */}

        {/* === Financial Breakdown & Action Button (Fixed at the bottom) === */}
        <div className="mt-auto">
          {/* Financial Breakdown */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm mb-1 text-gray-600">
              <span>Sub Total</span>
              <span className="font-medium">${subtotalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-1 text-gray-600">
              <span>Tax 5%</span>
              <span className="font-medium">${taxAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-xl font-bold text-gray-900 border-t border-gray-300 pt-3 mt-3">
              <span>Total Amount</span>
              <span className="text-green-600">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            className="mt-6 w-full py-4 bg-green-600 text-white font-bold rounded-lg shadow-xl hover:bg-green-700 transition-colors duration-50 flex items-center justify-center border-none cursor-pointer text-lg"
            disabled={poItems.size === 0}
            onClick={() => setIsModalActive(true)}
          >
            {/* Check circle icon for Confirm Order */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-check-circle w-5 h-5 mr-2"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
            Confirm Order
          </button>

          <ConfirmPoModal
            isOpen={isModalActive}
            onCloseFunc={closeConfirmPoModal}
            onConfirmFunc={closeConfirmPoModal}
            poNumber="PO-2025-00128"
            supplierName="Metro Meats Inc."
            totalItems={totalItems}
            totalAmount={totalAmount}
          />
        </div>
      </div>
    </div>
  );
};

export default PosScreen;
