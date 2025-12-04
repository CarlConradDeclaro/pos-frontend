import { Trash2 } from "lucide-react";
import { type PurchaseOrderItem } from "../../pages/Food-Drinks";

interface PosSummaryItemProps {
  purchaseOrderItem: PurchaseOrderItem;
  handleDeleteItem: (product: string) => void;
}

// TODO: Display image
const PosSummaryItem = ({ purchaseOrderItem, handleDeleteItem }: PosSummaryItemProps) => {
  const { name, quantity, total, imageUrl } = purchaseOrderItem;
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <div className="flex items-center">
        {/* Image Placeholder */}
        <div className="w-10 h-10 bg-none rounded-md mr-3 flex-shrink-0">
          <img src={imageUrl} alt={name} />
          {/* <div className="w-full h-full flex items-center justify-center text-xs text-gray-500"> */}
          {/*   [Image] */}
          {/* </div> */}
        </div>

        <div>
          <p className="font-medium text-sm text-gray-800">{name}</p>
          <p className="text-xs text-gray-500">{quantity}</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 bg-white">
        <p className="font-medium text-sm text-gray-800">{total.toFixed(2)}</p>
        <button 
          onClick={() => handleDeleteItem(name)}
          className="bg-white text-red-400 hover:text-red-500 cursor-pointer border-none"
        >
          <Trash2 size={"1rem"}/>
        </button>
      </div>
    </div>
  )
};

export default PosSummaryItem;
