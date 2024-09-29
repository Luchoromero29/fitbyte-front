import Typography from "./Typography/Typography"

interface ThTableProps {
    theme: string;
    label: string;
}
const ThTable = ({theme, label}: ThTableProps) => {
  return (
    <th>
        <Typography variant={`span-${theme === 'dark' ? "white" : "black"}`}>{label}</Typography>
    </th>
  )
}

export default ThTable