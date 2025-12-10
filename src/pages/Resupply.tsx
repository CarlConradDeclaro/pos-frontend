import { useState, useEffect } from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import ProductCard from '../components/Food-Drinks/ProductCard';
import PosSummaryItem from '../components/Food-Drinks/PosSummaryItem';
import CategoryButon from '../components/Food-Drinks/CategoryButton';
import ConfirmPoModal from '../components/Food-Drinks/ConfirmPoModal';
import type { Product } from '../types/Product';
import type { PurchaseOrderItem } from '../types/PurchaseOrderItem';
import * as mock from "../data/mockMerchantProducts";

const categories = ["All", "Grains & Staples", "Meat & Poultry", "Seafood", "Dairy", "Fruits", "Vegetables", "Oils & Fats", "Spices & Condiments", "Beverages", "Frozen & Ready-to-Cook"];

const ResupplyPage = () => {
  const [mockMerchantProducts, setMockMerchantProducts] = useState(mock.MOCK_GRAIN_PRODUCTS);
  const [selectedMerchant, setSelectedMerchant] = useState("Golden Grain Suppliers");
  const [subtotalAmount, setSubtotalAmount] = useState(0.00);
  const [taxAmount, setTaxAmount] = useState(0.00);
  const [totalAmount, setTotalAmount] = useState(0.00);
  const [searchedWord, setSearchedWord] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mock.MOCK_GRAIN_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [poItems, setPoItems] = useState<Map<string, PurchaseOrderItem>>(new Map);
  const [isModalActive, setIsModalActive] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const CategoryGroup = () => {
    const handleCategoryClick = (categoryName: string) => {
      setActiveCategory(categoryName);
    }

    return (
      <div className="max-w-3xl flex flex-shrink-0 overflow-x-scroll space-x-2 mb-6 p-4">
        {categories.map((category) => (
          <CategoryButon
            key={category}
            name={category}
            isActive={category === activeCategory}
            onClickFunc={handleCategoryClick}
          />
        ))}
      </div>
    )
  };

  const handlePoItems = (product: Product, quantity: number) => {
    setPoItems((previousMap) => {
      const newMap = new Map(previousMap);

      const existingItem = newMap.get(product.name);

      if (!existingItem && quantity <= 0) { }
      if (quantity <= 0) {
        newMap.delete(product.name);
      } else {
        if (existingItem) {
          if (existingItem.quantity === 0) {
            newMap.delete(product.name);
          }

          newMap.set(product.name, {
            id: existingItem.id,
            name: existingItem.name,
            quantity: quantity,
            total: product.price * quantity,
            imageUrl: existingItem.imageUrl,
            imageAlt: existingItem.imageAlt
          });
        } else {
          newMap.set(product.name, {
            id: product.id,
            name: product.name,
            quantity: quantity,
            total: product.price * quantity,
            // NOTE: Temporary
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
            imageAlt: product.name
          })
        }
      }

      return newMap;
    })
  }

  // For deleting a POS Item using the delete button
  const handleDeletePosItem = (product: string) => {
    setPoItems((previous) => {
      const newMap = new Map(previous);
      newMap.delete(product);
      return newMap;
    })
  }

  const closeConfirmPoModal = () => {
    setIsModalActive(false);
  }

  // For filtering the products based on the clicked category and searchbar
  useEffect(() => {
    let newFilteredProducts = mockMerchantProducts;
    if (activeCategory !== "All") {
      newFilteredProducts = mockMerchantProducts.filter((product) => {
        return product.category === activeCategory
      });
    }
    if (searchedWord.trim() !== "") {
      const lowerCaseSearch = searchedWord.toLowerCase();
      console.log(`lowercase searchword: ${lowerCaseSearch}`);

      newFilteredProducts = mockMerchantProducts.filter((product) => {
        return product.name.toLowerCase().includes(lowerCaseSearch);
      });
    }
    setFilteredProducts(newFilteredProducts);
  }, [activeCategory, searchedWord, mockMerchantProducts]);

  useEffect(() => {
    if (confirm("Go to a different merchant? This will clear out your cart")) {
      switch (selectedMerchant) {
        case "Golden Grain Suppliers":
          setMockMerchantProducts(mock.MOCK_GRAIN_PRODUCTS);
          break;
        case "FreshHarvest Co.":
          setMockMerchantProducts(mock.MOCK_FRUIT_PRODUCTS);
          break;
        case "Ocean Bounty Seafood":
          setMockMerchantProducts(mock.MOCK_SEAFOOD_PRODUCTS);
          break;
        case "Dairy Delight Inc.":
          setMockMerchantProducts(mock.MOCK_DAIRY_PRODUCTS);
          break;
        case "GreenLeaf Produce":
          setMockMerchantProducts(mock.MOCK_VEGETABLE_PRODUCTS);
          break;
        case "Sunflower Spices":
          setMockMerchantProducts(mock.MOCK_SPICE_PRODUCTS);
          break;
        case "PureEssence Oils":
          setMockMerchantProducts(mock.MOCK_OIL_PRODUCTS);
          break;
        default:
          setMockMerchantProducts([]);
      }
      setPoItems(new Map());
    }

  }, [selectedMerchant])


  // For updating the subtotal, tax, and total amount when POS Items change
  useEffect(() => {
    let subtotal = 0
    let totalQuantity = 0;
    poItems.forEach((item, _key) => {
      subtotal += item.total;
      totalQuantity += item.quantity;
    });

    setSubtotalAmount(subtotal);
    setTaxAmount(subtotalAmount * 0.05);
    setTotalAmount(subtotalAmount + taxAmount);
    setTotalItems(totalQuantity);
  }, [poItems, subtotalAmount, taxAmount, totalAmount]);


  return (
    <div className="flex justify-center h-screen bg-gray-50 p-6">

      {/* Products Column */}
      <div className="flex-1 max-w-[calc(100%-350px)] p-6 rounded-xl mr-6 flex flex-col">

        {/* Header */}
        <div className='flex justify-between mb-6'>
          <h1 className='w-5/12 text-2xl font-bold text-gray-800'>Create Purchase Order</h1>

          <div className='flex justify-around gap-3 w-7/12 p-3 border border-gray-200 rounded-lg focus:ring-green-500'>
            <Search />
            <input
              type="text"
              placeholder='Search product here...'
              className='h-full w-full bg-inherit focus:outline-none focus:ring-green-500'
              value={searchedWord}
              onChange={(e) => setSearchedWord(e.target.value)}
            />
          </div>
        </div>

        {/* NOTE: TBD if it will be in the system */}
        {/* Supplier Dropdown */}
        <div className="flex items-center w-full border border-gray-300 rounded-lg cursor-pointer p-0.5 hover:border-gray-400 transition-colors mb-6">
          <ShoppingCart className="h-5 text-gray-500 mx-3 flex-shrink-0" />
          <select
            name="supplier-select"
            id="supplier-select"
            className="bg-white w-full h-full cursor-pointer p-3"
            onChange={(e) => {
              console.log(`selected value: ${e.target.value}`);
              setSelectedMerchant(e.target.value)
            }}
          >
            <option value="Golden Grain Suppliers">Golden Grain Suppliers</option>
            <option value="FreshHarvest Co.">Fresh Harvest Co.</option>
            <option value="Ocean Bounty Seafood">Ocean Bounty Seafood</option>
            <option value="Dairy Delight Inc.">Dairy Delight Inc.</option>
            <option value="GreenLeaf Produce">GreenLeaf Produce</option>
            <option value="Sunflower Spices">Sunflower Spices</option>
            <option value="PureEssence Oils">PureEssence Oils</option>
          </select>
          {/* <ChevronDown className="h-4 text-gray-500 ml-auto" /> */}
        </div>


        {/* Category Tabs */}
        <CategoryGroup />

        {/* Product Grid */}
        <div className="w-full grid grid-cols-4 gap-6 overflow-y-auto pr-2">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
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

        <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">PO Summary</h2>

        {/* List of PO Items */}
        {poItems.size > 0 ?
          (
            <div className="flex-grow overflow-y-scroll pr-2 mb-6">
              {[...poItems.values()].map((item) => (
                <PosSummaryItem
                  key={item.id}
                  purchaseOrderItem={item}
                  handleDeleteItem={handleDeletePosItem}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-400 text-sm">No items in the PO.</div>
          )}


        <div className='mt-auto'>
          {/* Financial Breakdown */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm mb-1 text-gray-600">
              <span>Sub Total</span>
              <span>P{subtotalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-4 text-gray-600">
              <span>Tax 5%</span>
              <span>P{taxAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-lg font-bold text-gray-900 border-t pt-3">
              <span>Total Amount</span>
              <span>P{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            className="mt-6 w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-50 flex items-center justify-center border-none cursor-pointer"
            disabled={poItems.size === 0}
            onClick={() => setIsModalActive(true)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Submit
          </button>

          <ConfirmPoModal
            isOpen={isModalActive}
            onCloseFunc={closeConfirmPoModal}
            // NOTE: Temporary values, will be changed on actual implementation
            onConfirmFunc={closeConfirmPoModal}
            poNumber='PO-2025-00128'
            supplierName='Metro Meats Inc.'
            totalItems={totalItems}
            totalAmount={totalAmount}
          />
        </div>
      </div>

    </div >
  );
};

export default ResupplyPage;
