import { useState, useEffect } from "react";
import { type Product } from "../../pages/Food-Drinks";

interface ProductProps {
  product: Product;
  imagePlaceholder: string;
}

const ProductCard = ({ product, imagePlaceholder }: ProductProps) => {
  const [quantity, setQuantity] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (quantity === 0) {
      setIsActive(false);
    }
  }, [quantity]);

  return (
    <div className={`p-3 bg-white border rounded-lg ${isActive ? 'border-green-500' : 'border-gray-200'}`}>
      {/* Image Placeholder Area */}
      <div className="aspect-square rounded-md overflow-hidden mb-3 flex items-center justify-center">
        {/* This is a simple placeholder. In a real app, this would be an <img> tag. */}
        <img src={imagePlaceholder} alt="" />
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
        P{product.price} {product.unit}
      </p>

      {/* Action Button/Quantity Control */}
      {isActive ? (
        <div className="flex justify-between items-center text-green-700 border border-green-700 rounded-md">
          <button
            className="px-2 text-xl font-bold transition-opacity hover:opacity-75"
            onClick={() => setQuantity((previous) => previous - 1)}
          >
            -
          </button>
          {/* <span className="font-semibold">{quantity}</span> */}
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(Number(e.target.value))
            }}
            className="w-6/12 text-center focus:outline-none 
            [appearance:textfield]
            [&::-webkit-inner-spin-button]:appearance-none
            [&::-webkit-outer-spin-button]:appearance-none 
            [&::-webkit-inner-spin-button]:m-0 
            [&::-webkit-outer-spin-button]:m-0
            "
          />
          <button
            className="px-2 text-xl font-bold transition-opacity hover:opacity-75"
            onClick={() => setQuantity((previous) => previous + 1)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="w-full py-2 text-sm font-semibold text-green-500 border border-green-700 rounded-md hover:bg-green-50 transition-colors"
          onClick={() => {
            setIsActive(true);
            setQuantity((previous) => previous + 1);
          }}
        >
          Add to PO
        </button>
      )}
    </div>
  );
};

export default ProductCard;
