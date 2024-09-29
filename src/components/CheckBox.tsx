import React, { useState } from "react";

interface CustomCheckboxProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  theme: string; 
}

const CheckBox: React.FC<CustomCheckboxProps> = ({
  checked = false,
  onChange,
  label = "",
  theme,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <div className="flex items-center space-x-2 justify-center">
      <div
        className={`shadow-sm w-5 h-5 rounded-md cursor-pointer flex justify-center items-center 
        ${
          isChecked ? "bg-succes" : theme === "dark" ? "bg-dark-3" : "bg-gray-200" 
        } transition-colors duration-200 ease-in-out`}
        onClick={toggleCheckbox}
      >
        {isChecked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      {label && <span>{label}</span>}
    </div>
  );
};

export default CheckBox;
