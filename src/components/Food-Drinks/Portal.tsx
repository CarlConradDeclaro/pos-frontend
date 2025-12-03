import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  wrapperId: string;
}

const Portal = ({ children, wrapperId }: PortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;

    // If the element doesn't exist, create it and append it to the document body
    if (!element) {
      element = document.createElement('div');
      element.setAttribute('id', wrapperId);
      document.body.appendChild(element);
      systemCreated = true;
    }
    setWrapperElement(element);

    // Clean up function: Remove the element if it was created by this component
    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // If the wrapper element hasn't been created yet, return null
  if (wrapperElement === null) return null;

  // Use createPortal to render the children into the wrapper element
  return createPortal(children, wrapperElement);
};

export default Portal;
