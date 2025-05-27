import { createPortal } from "react-dom";

import styles from "./Modal.module.css";

interface ModalProps {
   onClose: () => void;
   isOpen: boolean;
   children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, isOpen, children }) => {
   const modalRoot = document.getElementById("modal-root");

   if (!isOpen || !modalRoot) return null;

   return createPortal(
      <div onClick={onClose} className={styles.modalOverlay}>
         <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
         >
            {children}
         </div>
      </div>,
      modalRoot
   );
};

export default Modal;
