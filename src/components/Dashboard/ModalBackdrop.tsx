interface ModalBackdropProps {
  onCloseFunc: () => void;
}

const ModalBackdrop = ({ onCloseFunc }: ModalBackdropProps) => {
  return (
    // Backdrop/Overlay: Fixed to cover the screen with a semi-transparent black background
    // z-index: 40 is slightly lower than the modal content's z-index (50, handled in the main component)
    <div 
      className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300"
      onClick={onCloseFunc} // Allows closing modal by clicking outside
    />
  );
};

export default ModalBackdrop;
