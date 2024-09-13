// src/components/Typography.jsx
import './Typography.css';

const Typography = ({ variant, children }: Typo) => {
  return (
    <span className={`typography-${variant} text-wrap`}>
      {children}
    </span>
  );
};

interface Typo {
    variant: string,
    children: React.ReactNode
}

export default Typography;
