import React from "react";
import { MouseEventHandler } from "react";

import styles from "./Button.module.css";

interface ButtonProps {
   children: string;
   type?: "submit" | "reset" | "button";
   onClick?: MouseEventHandler<HTMLButtonElement>;
   className?: string;
   name?: string;
   disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
   type,
   children,
   onClick,
   className = "",
   name,
   disabled = false,
}) => {
   const buttonClasses = [styles.button, styles[className], className]
      .filter(Boolean)
      .join(" ");
   return (
      <button
         type={type}
         onClick={onClick}
         className={buttonClasses}
         name={name}
         disabled={disabled}
      >
         {children}
      </button>
   );
};

export default Button;
