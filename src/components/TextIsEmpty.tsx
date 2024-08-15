import Typography from "./Typography/Typography"

interface TextIsEmptyProps {
    label: string
}

export const TextIsEmpty = ({label}: TextIsEmptyProps) => {
  return (
    <div>
        <Typography variant="h6-white">No se encontraron: {label}</Typography>
    </div>
  )
}
