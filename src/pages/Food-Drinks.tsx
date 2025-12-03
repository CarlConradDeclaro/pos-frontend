import { useState, useEffect } from 'react';
import { ShoppingCart, Search, ChevronDown } from 'lucide-react';
import ProductCard from '../components/Food-Drinks/ProductCard';
import PosSummaryItem from '../components/Food-Drinks/PosSummaryItem';
import CategoryButon from '../components/Food-Drinks/CategoryButton';
import ConfirmPoModal from '../components/Food-Drinks/ConfirmPoModal';

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
  { id: 1, name: 'Adobo', category: 'Ulam', price: 59.99, imageUrl: 'salad.jpg', unit: '/pc' },
  { id: 2, name: 'Beef Tapa', category: 'Ulam', price: 59.99, imageUrl: 'salad.jpg', unit: '/pc' },
  { id: 3, name: 'Lechon Kawali', category: 'Ulam', price: 59.99, imageUrl: 'salad.jpg', unit: '/pc' },
  { id: 4, name: 'Bistek Tagalog', category: 'Ulam', price: 64.99, imageUrl: 'salad.jpg', unit: '/pc' },
  { id: 5, name: 'Pork Menudo', category: 'Ulam', price: 59.99, imageUrl: 'salad.jpg', unit: '/pc' },
  { id: 6, name: 'Sinigang na Baboy', category: 'Ulam', price: 69.99, imageUrl: 'salad.jpg', unit: '/pc' },
  { id: 7, name: 'Sinigang na Hipon', category: 'Ulam', price: 69.99, imageUrl: 'salad.jpg', unit: '/pc' },
  { id: 8, name: 'Bulalo', category: 'Ulam', price: 74.99, imageUrl: 'salad.jpg', unit: '/pc' },
  { id: 9, name: 'Tapsilog', category: 'Silog', price: 59.99, imageUrl: 'salad.jpg', unit: '/pc' },
  { id: 10, name: 'Porksilog', category: 'Silog', price: 59.99, imageUrl: 'tacos.jpg', unit: '/pc' },
  { id: 11, name: 'Chicsilog', category: 'Silog', price: 59.99, imageUrl: 'tacos.jpg', unit: '/pc' },
  { id: 12, name: 'Cornsilog', category: 'Silog', price: 59.99, imageUrl: 'tacos.jpg', unit: '/pc' },
  { id: 13, name: 'Bacsilog', category: 'Silog', price: 59.99, imageUrl: 'burger1.jpg', unit: '/pc' },
  { id: 14, name: 'Bangsilog', category: 'Silog', price: 59.99, imageUrl: 'sushi1.jpg', unit: '/pc' },
  { id: 15, name: 'Pork Sisig', category: 'Sisig', price: 59.99, imageUrl: 'sushi1.jpg', unit: '/pc' },
  { id: 16, name: 'Chicken Sisig', category: 'Sisig', price: 59.99, imageUrl: 'burger2.jpg', unit: '/pc' },
  { id: 17, name: 'Crocodile Sisig', category: 'Sisig', price: 59.99, imageUrl: 'burger2.jpg', unit: '/pc' },
  { id: 18, name: 'Fishball', category: 'Snack', price: 4.00, imageUrl: 'tacos.jpg', unit: '/5pcs' },
  { id: 19, name: 'Kwek-Kwek', category: 'Snack', price: 20.00, imageUrl: 'sushi1.jpg', unit: '/5pcs' },
  { id: 20, name: 'Kikiam', category: 'Snack', price: 10.00, imageUrl: 'burger1.jpg', unit: '/5pcs' },
  { id: 21, name: 'Burger', category: 'Snack', price: 59.99, imageUrl: 'burger1.jpg', unit: '/pc' },
  { id: 22, name: 'Cheeseburger', category: 'Snack', price: 64.99, imageUrl: 'burger1.jpg', unit: '/pc' },
  { id: 23, name: 'Orange Juice', category: 'Drinks', price: 19.99, imageUrl: 'juice.jpg', unit: '/pc' },
  { id: 24, name: 'Iced Tea', category: 'Drinks', price: 19.99, imageUrl: 'juice.jpg', unit: '/pc' },
  { id: 25, name: 'Mango Shake', category: 'Drinks', price: 35.99, imageUrl: 'juice.jpg', unit: '/pc' },
  { id: 26, name: 'Apple Shake', category: 'Drinks', price: 35.99, imageUrl: 'juice.jpg', unit: '/pc' },
  { id: 27, name: 'Coke', category: 'Drinks', price: 59.99, imageUrl: 'juice.jpg', unit: '/pc' },
  { id: 28, name: 'Sprite', category: 'Drinks', price: 59.99, imageUrl: 'juice.jpg', unit: '/pc' },
  { id: 29, name: 'Royal', category: 'Drinks', price: 59.99, imageUrl: 'juice.jpg', unit: '/pc' },
  { id: 30, name: 'Mountain Dew', category: 'Drinks', price: 59.99, imageUrl: 'juice.jpg', unit: '/pc' },
  { id: 31, name: 'Gulaman', category: 'Drinks', price: 19.99, imageUrl: 'juice.jpg', unit: '/pc' },
  { id: 32, name: 'Bottled Water', category: 'Drinks', price: 14.99, imageUrl: 'juice.jpg', unit: '/pc' },
  { id: 33, name: 'Halo-Halo', category: 'Dessert', price: 39.99, imageUrl: 'juice.jpg', unit: '/pc' },
  { id: 34, name: 'Vanilla Ice Cream', category: 'Dessert', price: 29.99, imageUrl: 'juice.jpg', unit: '/pc' },
  { id: 35, name: 'Chocolate Ice Cream', category: 'Dessert', price: 29.99, imageUrl: 'juice.jpg', unit: '/pc' },
  { id: 36, name: 'Turon', category: 'Dessert', price: 24.99, imageUrl: 'juice.jpg', unit: '/pc' },
]

const categories = ['All', 'Ulam', 'Silog', 'Sisig', 'Drinks', 'Dessert'];

const PosScreen = () => {
  const [subtotalAmount, setSubtotalAmount] = useState(0.00);
  const [taxAmount, setTaxAmount] = useState(0.00);
  const [totalAmount, setTotalAmount] = useState(0.00);
  const [searchedWord, setSearchedWord] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [poItems, setPoItems] = useState<Map<string, PurchaseOrderItem>>(new Map);
  const [isModalActive, setIsModalActive] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const CategoryGroup = () => {
    const handleCategoryClick = (categoryName: string) => {
      setActiveCategory(categoryName);
    }

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
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
            imageAlt: product.name
          })
        }
      }

      return newMap;
    })
  }

  // Function for deleting a POS Item using the delete button
  // TODO: Make the product in the grid reflect to zero
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

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProducts(MOCK_PRODUCTS);
      return;
    }

    const newFilteredProducts = MOCK_PRODUCTS.filter((product) => {
      return product.category === activeCategory
    })

    setFilteredProducts(newFilteredProducts);
  }, [activeCategory]);

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

        {/* Supplier Dropdown and Search */}
        <div className="flex items-center w-full border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-gray-400 transition-colors mb-6">
          <ShoppingCart className="h-5 text-gray-500 mr-3 flex-shrink-0" />
          <span className="text-gray-800 font-medium">Metro Meats Inc.</span>
          <ChevronDown className="h-4 text-gray-500 ml-auto" />
        </div>


        {/* Category Tabs */}
        <CategoryGroup />

        {/* Product Grid */}
        <div className="grid grid-cols-4 gap-6 overflow-y-auto pr-2">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              imageLink={`https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg`}
              imageAlternative={product.name}
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
            <div className="flex-grow overflow-y-auto pr-2 mb-6">
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
          className="mt-6 w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center"
          onClick={() => setIsModalActive(true)}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Send PO to Supplier
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

    </div >
  );
};

export default PosScreen;
