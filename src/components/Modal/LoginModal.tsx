import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { useAuthStore } from "@/shared/stores/authStore";
import Button from "@/uikits/Button/Button";

import styles from "./LoginModal.module.css";

export const LoginModal = ({
   isOpen,
   onClose,
}: {
   isOpen: boolean;
   onClose: () => void;
}) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const { login } = useAuthStore();

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const success = login(email, password);
      if (success) {
         onClose();
      } else {
         setError("Invalid email or password");
      }
   };

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.formTitle}>Login</h2>
            <div>
               <label htmlFor='email' className={styles.formLabel}>
                  Email
               </label>
               <input
                  className={styles.formInput}
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </div>

            <div>
               <label htmlFor='password' className={styles.formLabel}>
                  Password
               </label>
               <input
                  className={styles.formInput}
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </div>

            {error && <div className={styles.formError}>{error}</div>}

            <div className={styles.formActions}>
               <Button type='submit'>Log In</Button>
               <Button type='button' onClick={onClose}>
                  Cancel
               </Button>
            </div>
         </form>
      </Modal>
   );
};
