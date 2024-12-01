import Typography from "./Typography/Typography"

interface ThTableProps {
    label: string;
}
const ThTable = ({label}: ThTableProps) => {
  return (
    <th>
        <Typography variant={`span`}>{label}</Typography>
    </th>
  )
}

export default ThTable