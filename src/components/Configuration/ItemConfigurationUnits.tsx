import React from 'react'
import Typography from '../Typography/Typography'
import ItemOptionsConfiguration from './ItemOptionsConfiguration'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { reqUpdatePreference } from '../../service/preferenceService';
import { addPreferenceUser } from '../../store/preferenceSlice';


interface ItemConfigurationUnitsProps {
    label: string,

}
const ItemConfigurationUnits = ({label}: ItemConfigurationUnitsProps) => {

  const preference = useSelector((state: RootState) => state.preferenceUser);
  const dispatch = useDispatch();

  const handleChangeUnits = async (value: string) => {
      
      
      if (preference.unitWeight !== value) {
          const newPreference = {
              ...preference,
              unitWeight: value
          }
          await reqUpdatePreference(newPreference)
          dispatch(addPreferenceUser(newPreference));
      }
  }


  const optionsUnits = [{
      label: 'Kilogramos',
      value: 'KG'
  },
  {
      label: 'Libras',
      value: 'LB'
  }]

  

  return (
    <>
        <div className={`flex flex-col p-3 ${preference.theme === 'dark' ? 'bg-black' : 'bg-white'} rounded-md shadow-md gap-2`}>
            <header>
                <Typography variant={`h5-${preference.theme === 'dark' ? 'white' : 'black'}`}>{label}</Typography>
            </header>
            <main className='flex gap-2'>
                {optionsUnits.map((option, index) => (
                    <ItemOptionsConfiguration key={index} option={option} color={preference.theme === 'dark' ? 'white' : 'black'} active={preference.unitWeight === option.value} onClick={handleChangeUnits} />
                ))}
            </main>
        </div>

    </>
  )
}

export default ItemConfigurationUnits