import React from 'react'
import Typography from '../Typography/Typography'

interface ItemConfigurationThemeProps {
    label: string,

}
const ItemConfigurationTheme = ({label}: ItemConfigurationThemeProps) => {
  return (
    <>
        <div>
            <header>
                <Typography variant='span-white'>{label}</Typography>
            </header>
            <main>
                
            </main>
        </div>

    </>
  )
}

export default ItemConfigurationTheme