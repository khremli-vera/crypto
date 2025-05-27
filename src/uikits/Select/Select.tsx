import React from "react";

import styles from "./Select.module.css";

interface SelectProps {
   options?: { title: string; value: string }[];
   value?: string;
   onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
   className?: string;
}

const Select: React.FC<SelectProps> = ({
   options = [{ title: "Select Action", value: "" }],
   value = "",
   onChange,
   className = "",
}) => {
   const selectClasses = [styles.select, styles[className], className]
      .filter(Boolean)
      .join(" ");
   return (
      <select className={selectClasses} value={value} onChange={onChange}>
         {options.map((option) => (
            <option key={option.value} value={option.value}>
               {option.title}
            </option>
         ))}
      </select>
   );
};

export default Select;
