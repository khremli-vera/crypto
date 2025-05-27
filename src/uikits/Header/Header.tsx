import { NavLink } from "react-router-dom";
import { LoginModal } from "@/components/Modal/LoginModal";
import { useState } from "react";
import { useAuthStore } from "@/shared/stores/authStore";
import Button from "@/uikits/Button/Button";

import styles from "./Header.module.css";

const Header = () => {
   const [isLoginOpen, setIsLoginOpen] = useState(false);
   const { isAuthenticated, userEmail, logout } = useAuthStore();

   return (
      <header className={styles.header}>
         <nav className={styles.nav}>
            <NavLink
               to='/'
               className={({ isActive }) =>
                  `${styles.headerLink} ${isActive ? styles.activeLink : ""}`
               }
            >
               Home
            </NavLink>
            <NavLink
               to='/trade'
               className={({ isActive }) =>
                  `${styles.headerLink} ${isActive ? styles.activeLink : ""}`
               }
            >
               Trade
            </NavLink>
         </nav>

         {isAuthenticated ? (
            <div className={styles.userInfo}>
               <p className={styles.welcome}>
                  Welcome, <span>{userEmail}</span>
               </p>
               <Button onClick={logout}>Logout</Button>
            </div>
         ) : (
            <>
               <Button onClick={() => setIsLoginOpen(true)}>Login</Button>
               <LoginModal
                  isOpen={isLoginOpen}
                  onClose={() => setIsLoginOpen(false)}
               />
            </>
         )}
      </header>
   );
};

export default Header;
