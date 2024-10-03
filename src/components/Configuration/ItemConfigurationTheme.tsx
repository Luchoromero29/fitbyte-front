import React from 'react'
import Typography from '../Typography/Typography'
import ItemOptionsConfiguration from './ItemOptionsConfiguration'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { reqUpdatePreference } from '../../service/preferenceService';
import { addPreferenceUser } from '../../store/preferenceSlice';


interface ItemConfigurationThemeProps {
    label: string,
}

const ItemConfigurationTheme = ({label}: ItemConfigurationThemeProps) => {

  const preference = useSelector((state: RootState) => state.preferenceUser);

  const dispatch = useDispatch();

  const handleChangeTheme = async (value: string) => {
      
      
      if (preference.theme !== value) {
          const newPreference = {
              ...preference,
              theme: value
          }
          await reqUpdatePreference(newPreference)
          dispatch(addPreferenceUser(newPreference));
      }
  }


  const optionsTheme = [{
      label: 'Claro',
      value: 'light'
  },
  {
      label: 'Oscuro',
      value: 'dark'
  }]

  return (
    <>
        <div className={`flex flex-col p-3 ${preference.theme === 'dark' ? 'bg-black' : 'bg-white'} rounded-md shadow-md gap-2`}>
            <header>
                <Typography variant={`h5-${preference.theme === 'dark' ? 'white' : 'black'}`}>{label}</Typography>
            </header>
            <main className='flex gap-2'>
              {optionsTheme.map((option, index) => (
                  <ItemOptionsConfiguration key={index} option={option} color={preference.theme === 'dark' ? 'white' : 'black'} active={preference.theme === option.value} onClick={handleChangeTheme} />
              ))}  
            </main>
        </div>

    </>
  )
}

export default ItemConfigurationTheme