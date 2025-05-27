import React from "react";
import { MouseEventHandler } from "react";

import styles from "./Button.module.css";

interface ButtonProps {
   children: string;
   type?: "submit" | "reset" | "button";
   onClick?: MouseEventHandler<HTMLButtonElement>;
   className?: string;
   name?: string;
}

const Button: React.FC<ButtonProps> = ({
   type,
   children,
   onClick,
   className = "",
   name,
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
      >
         {children}
      </button>
   );
};

export default Button;
