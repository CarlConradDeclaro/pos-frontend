import Portal from './Portal';
import ModalBackdrop from './ModalBackdrop';

interface DetailRowProps {
  label: string;
  value: string;
  isBold?: boolean;
}

interface ConfirmPoModalProps {
  isOpen: boolean;
  onCloseFunc: () => void;
  onConfirmFunc: () => void;
  poNumber: string;
  supplierName: string;
  totalItems: number;
  totalAmount: number;
}

// Helper Component: DetailRow 
const DetailRow = ({ label, value, isBold = false }: DetailRowProps) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}</span>
    <span className={`text-gray-800 ${isBold ? 'font-semibold' : ''}`}>{value}</span>
  </div>
);

// Main Modal Component 
const ConfirmPoModal = ({
  isOpen,
  onCloseFunc,
  onConfirmFunc,
  poNumber,
  supplierName,
  totalItems,
  totalAmount,
}: ConfirmPoModalProps) => {
  if (!isOpen) return null;

  const formattedAmount = `P${totalAmount.toFixed(2)}`;

  // The Portal mounts the content (Backdrop and Modal) at the document root
  return (
    <Portal wrapperId="modal-root">
      {/* 1. The Backdrop */}
      <ModalBackdrop onCloseFunc={onCloseFunc} />

      {/* 2. The Modal Content Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-auto transform transition-all scale-100 opacity-100"
          // Stop propagation ensures clicking inside the modal doesn't trigger the backdrop's onClose
          onClick={e => e.stopPropagation()} 
        >
          <div className="flex flex-col items-center space-y-4 text-center">
            
            {/* Header Icon (Simulated green check/triangle from image) */}
            <div className="p-2 rounded-full bg-green-100 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800">Confirm Send PO</h3>
            
            {/* Message */}
            <p className="text-gray-500 text-sm">
              Are you sure you want to send this Purchase Order to **{supplierName}**?
            </p>
            
            {/* Summary Details */}
            <div className="w-full space-y-2 p-4 text-sm bg-gray-100 rounded-xl">
              <DetailRow label="PO Number" value={poNumber} />
              <DetailRow label="Total Items" value={totalItems.toString()} />
              <DetailRow label="Total Amount" value={formattedAmount} isBold={true} />
            </div>

            <div className="flex w-full space-x-3">
              {/* Cancel Button */}
              <button
                onClick={onCloseFunc}
                className="flex-1 px-4 py-2 text-gray-600 border-none rounded-lg hover:bg-gray-200 transition duration-150"
              >
                Cancel
              </button>
              
              {/* Confirm & Send Button */}
              <button
                onClick={onConfirmFunc}
                className="flex-1 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150 flex items-center justify-center border-none"
              >
                Confirm & Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ConfirmPoModal;
