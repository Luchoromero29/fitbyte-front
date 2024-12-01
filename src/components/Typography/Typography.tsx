// src/components/Typography.jsx
import "./Typography.css";

const Typography = ({ variant, children }: Typo) => {
  const isViolet = variant.includes("violet");

  return (
    <span
      className={`typography-${variant} text-wrap ${
        isViolet ? "dark:text-violet-2" : "dark:text-white text-black"
      }`}
    >
      {children}
    </span>
  );
};

interface Typo {
  variant: string;
  children: React.ReactNode;
}

export default Typography;
