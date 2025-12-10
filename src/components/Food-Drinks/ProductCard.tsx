import type { Product } from "../../types/Product";

interface ProductProps {
  product: Product;
  imageLink: string;
  imageAlternative: string;
  currentQuantity: number;
  handlePoItems: (product: Product, quantity: number) => void;
}

const ProductCard = ({ product, imageLink, imageAlternative, currentQuantity, handlePoItems }: ProductProps) => {
  const isActive = currentQuantity > 0;

  const handleUpdateQuantity = (newQuantity: number) => {
    handlePoItems(product, newQuantity);
  }

  return (
    <div className={`p-3 bg-white border rounded-lg transition-colors duration-50 shadow-sm ${isActive ? 'border-green-500' : 'border-gray-200'}`}>
      <div className="aspect-square rounded-md overflow-hidden mb-3 flex items-center justify-center">
        <img src={imageLink} alt={imageAlternative} />
      </div>

      {/* Product Info */}
      <h3 className="font-semibold text-gray-800 text-nowrap overflow-x-scroll">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-3">
        P{product.price}/{product.unit}
      </p>

      <div className="flex justify-between items-center bg-green-100 text-green-500 border border-green-100 rounded-xl">
        <button
          className="px-5 py-1 text-xl font-bold bg-inherit transition-opacity hover:opacity-75 border-none"
          onClick={() => { if (currentQuantity > 0) { handleUpdateQuantity(currentQuantity - 1) } }}
        >
          -
        </button>
        <input
          type="number"
          value={currentQuantity}
          min={0}
          onChange={(e) => {
            const newQuantity = Number(e.target.value);
            if (!isNaN(newQuantity) && newQuantity >= 0) {
              handleUpdateQuantity(newQuantity);
            }
          }}
          className="w-6/12 text-center focus:outline-none bg-inherit 
            [appearance:textfield]
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none 
            [&::-webkit-inner-spin-button]:m-0 
            [&::-webkit-outer-spin-button]:m-0
            "
        />
        <button
          className="px-5 py-0 text-xl font-bold bg-inherit transition-opacity hover:opacity-75 border-none"
          onClick={() => handleUpdateQuantity(currentQuantity + 1)}
        >
          +
        </button>
      </div>

    </div>
  );
};

export default ProductCard;
