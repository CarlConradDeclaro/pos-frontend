import { useState, useEffect, useRef } from "react";
import { type Product } from "../../pages/Food-Drinks";

interface ProductProps {
  product: Product;
  imageLink: string;
  imageAlternative: string;
  handlePoItems: (product: Product, quantity: number) => void;
}

const ProductCard = ({ product, imageLink, imageAlternative, handlePoItems }: ProductProps) => {
  const [quantity, setQuantity] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // If statement to prevent calling handlePoItems every page load,
    // only on state updates
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (quantity <= 0) {
      setIsActive(false);
    } else {
      if (!isActive) { setIsActive(true) }
    }
      handlePoItems(product, quantity);
  }, [quantity, product, isActive]);

  return (
    <div className={`p-3 bg-white border rounded-lg transition-colors duration-50 shadow-sm ${isActive ? 'border-green-500' : 'border-gray-200'}`}>
      {/* Image Placeholder Area */}
      <div className="aspect-square rounded-md overflow-hidden mb-3 flex items-center justify-center">
        {/* This is a simple placeholder. In a real app, this would be an <img> tag. */}
        <img src={imageLink} alt={imageAlternative} />
        {/* <div className="w-full h-full" style={{ backgroundImage: `url(${imagePlaceholder})`, backgroundSize: 'cover', backgroundPosition: 'center' }}> */}
        {/*   {/* If an image URL is not available, we can display a text placeholder */}
        {/*   {imagePlaceholder.includes('placeholder') && ( */}
        {/*     <div className="w-full h-full flex items-center justify-center text-xs text-gray-400"> */}
        {/*     </div> */}
        {/*   )} */}
        {/* </div> */}
      </div>

      {/* Product Info */}
      <h3 className="font-semibold text-gray-800 text-nowrap overflow-x-scroll">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-3">
        P{product.price}{product.unit}
      </p>

      <div className="flex justify-between items-center bg-green-100 text-green-500 border border-green-100 rounded-xl">
        <button
          className="px-5 py-1 text-xl font-bold bg-inherit transition-opacity hover:opacity-75 border-none"
          onClick={() => {
            if (quantity > 0) {
              setQuantity((previous) => previous - 1)
            }
          }}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          min={0}
          onChange={(e) => {
            if (e.target.value !== "") { setQuantity(Number(e.target.value)) }
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
          onClick={() => setQuantity((previous) => previous + 1)}
        >
          +
        </button>
      </div>

    </div>
  );
};

export default ProductCard;
