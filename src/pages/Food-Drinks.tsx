import { ShoppingCart, Search, ChevronDown, Grid2x2 } from 'lucide-react';
import ProductCard from '../components/Food-Drinks/ProductCard';
import PosSummaryItem from '../components/Food-Drinks/PosSummaryItem';

// --- MOCK DATA FOR LAYOUT ---

// Define types for clarity, even though data is mocked
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
  quantity: string;
  total: string;
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
  { id: 35, name: 'Cookies and Cream Ice Cream', category: 'Dessert', price: 29.99, imageUrl: 'juice.jpg', unit: '/pc' },
  { id: 36, name: 'Turon', category: 'Dessert', price: 24.99, imageUrl: 'juice.jpg', unit: '/pc' },
]

// Data for the PO Summary
const MOCK_PO_ITEMS: PurchaseOrderItem[] = [
  { id: 1, name: 'Burger Patties', quantity: '65x', total: '$1,625.00', imageAlt: 'Burger Patties Image' },
  { id: 2, name: 'Pizza Dough', quantity: '30x', total: '$255.00', imageAlt: 'Pizza Dough Image' },
  { id: 3, name: 'Cola', quantity: '15x', total: '$22.50', imageAlt: 'Cola Image' },
];

// Data for the financial summary
const FINANCIAL_SUMMARY = {
  subTotal: '$1,902.50',
  tax: '$95.13',
  totalAmount: '$1,997.63',
};

// --- SUB-COMPONENTS ---


/**
 * Main POS Component
 */
const PosScreen = () => {
  return (
    <div className="flex justify-center h-screen bg-gray-50 p-6">

      {/* --- Left Column: Product Selector (8/12 width) --- */}
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
            />
          </div>
        </div>

        {/* Supplier Dropdown and Search */}
        {/* <div className="flex w-full items-center mb-6"> */}
        <div className="flex items-center w-full border border-gray-300 rounded-lg p-3 cursor-pointer hover:border-gray-400 transition-colors mb-6">
          <ShoppingCart className="h-5 text-gray-500 mr-3 flex-shrink-0" />
          <span className="text-gray-800 font-medium">Metro Meats Inc.</span>
          <ChevronDown className="h-4 text-gray-500 ml-auto" />
        </div>

        {/* </div> */}

        {/* Category Tabs */}
        <div className="flex space-x-2 mb-6 pb-2">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-green-500 bg-green-100 hover:border-green-500 rounded-xl transition-all gap-1.5">
            <Grid2x2 />
            All
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-2xl hover:bg-gray-200 hover:border-green-600 transition-colors">
            Ulam
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-2xl hover:bg-gray-200 hover:border-green-600 transition-colors">
            Silog
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-2xl hover:bg-gray-200 hover:border-green-600 transition-colors">
            Sisig
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-2xl hover:bg-gray-200 hover:border-green-600 transition-colors">
            Drinks
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-2xl hover:bg-gray-200 hover:border-green-600 transition-colors">
            Dessert
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-4 gap-6 overflow-y-auto pr-2 flex-grow">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              // In a real app, this would be a dynamic image URL
              imagePlaceholder={`https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg`}
            />
          ))}
          {/* Filler cards to ensure the grid aligns properly if needed */}
          <div className="col-span-1"></div>
          <div className="col-span-1"></div>
          <div className="col-span-1"></div>
        </div>

      </div>

      {/* --- Right Column: PO Summary (fixed 350px width) --- */}
      <div className="w-[350px] bg-white p-6 rounded-xl shadow-lg flex flex-col">

        {/* Summary Header */}
        <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">PO Summary</h2>

        {/* List of PO Items */}
        <div className="flex-grow overflow-y-auto pr-2 mb-6">
          {MOCK_PO_ITEMS.map(item => (
            <PosSummaryItem key={item.id} {...item} />
          ))}
          {/* Placeholder for more items to show scroll potential */}
          <div className="text-center py-4 text-gray-400 text-sm">... More items would appear here ...</div>
        </div>

        {/* Financial Breakdown */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm mb-1 text-gray-600">
            <span>Sub Total</span>
            <span>{FINANCIAL_SUMMARY.subTotal}</span>
          </div>
          <div className="flex justify-between text-sm mb-4 text-gray-600">
            <span>Tax 5%</span>
            <span>{FINANCIAL_SUMMARY.tax}</span>
          </div>

          <div className="flex justify-between items-center text-lg font-bold text-gray-900 border-t pt-3">
            <span>Total Amount</span>
            <span>{FINANCIAL_SUMMARY.totalAmount}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="mt-6 w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 mr-2" />
          Send PO to Supplier
        </button>
      </div>

    </div>
  );
};

export default PosScreen;
