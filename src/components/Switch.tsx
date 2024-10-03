import { useState } from "react";

interface SwitchProps {
  onToggle: (isOn: boolean) => void;
  value: boolean;
  theme: string;
}
const Switch = ({ onToggle, value, theme }: SwitchProps) => {
  const [isOn, setIsOn] = useState(value);
  const handleSwitchToggle = () => {
    // Dispara una función según el estado del switch
    onToggle(!isOn);
    setIsOn(!isOn);
  };

  return (
    <div
      onClick={handleSwitchToggle}
      className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        isOn ? "bg-violet-1" : theme === "dark" ? "bg-dark-3" : "bg-gray-200" 
      }`}
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-8" : "translate-x-0"
        }`}
      />
    </div>
  );
};

export default Switch;
