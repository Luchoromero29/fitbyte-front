import Typography from "./Typography/Typography";

interface TextIsEmptyProps {
  label: string;
}

export const TextIsEmpty = ({ label }: TextIsEmptyProps) => {
  return (
    <div className={` dark:bg-dark-3 bg-light-2  p-3 rounded-md`}>
      <Typography variant={`span-medium`}>
        Primero se deben crear {label}
      </Typography>
    </div>
  );
};
