import { Trash2 } from "lucide-react";
import { type PurchaseOrderItem } from "../../pages/Food-Drinks";

/**
 * PO Item Summary Component
 */
const PosSummaryItem = ({ name, quantity, total, imageAlt }: PurchaseOrderItem) => (
  <div className="flex items-center justify-between py-2 border-b last:border-b-0">
    <div className="flex items-center">
      {/* Image Placeholder */}
      <div className="w-10 h-10 bg-gray-200 rounded-md mr-3 flex-shrink-0">
        <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
          [Image]
        </div>
      </div>

      <div>
        <p className="font-medium text-sm text-gray-800">{name}</p>
        <p className="text-xs text-gray-500">{quantity}</p>
      </div>
    </div>

    <div className="flex items-center space-x-2">
      <p className="font-medium text-sm text-gray-800">{total}</p>
      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" />
    </div>
  </div>
);

export default PosSummaryItem;
