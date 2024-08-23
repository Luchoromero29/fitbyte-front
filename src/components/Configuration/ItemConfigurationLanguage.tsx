import React from 'react'
import Typography from '../Typography/Typography'
import ItemOptionsConfiguration from './ItemOptionsConfiguration'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { reqUpdatePreference } from '../../service/preferenceService';
import { addPreferenceUser } from '../../store/preferenceSlice';


interface ItemConfigurationLanguageProps {
    label: string,

}
const ItemConfigurationLanguage = ({label}: ItemConfigurationLanguageProps) => {

  const preference = useSelector((state: RootState) => state.preferenceUser);
    const dispatch = useDispatch();

    const handleChangeLanguage = async (value: string) => {
        console.log("holaaa");
        
        if (preference.language !== value) {
            const newPreference = {
                ...preference,
                language: value
            }
            await reqUpdatePreference(newPreference)
            dispatch(addPreferenceUser(newPreference));
        }
    }


    const optionsLenguage = [{
        label: 'Español',
        value: 'ES'
    },
    {
        label: 'Ingles',
        value: 'EN'
    }]

  return (
    <>
        <div className={`flex flex-col p-3 ${preference.theme === 'dark' ? 'bg-black' : 'bg-white'}  rounded-md shadow-md gap-2`}>
            <header>
                <Typography variant={`h5-${preference.theme === 'dark' ? 'white' : 'black'}`}>{label}</Typography>
            </header>
            <main className='flex gap-2'>
                {optionsLenguage.map((option, index) => (
                    <ItemOptionsConfiguration
                        key={index}
                        option={option}
                        color={preference.theme === 'dark' ? 'white' : 'black'}
                        active={preference.language === option.value}
                        onClick={handleChangeLanguage}
                    />
                ))}
            </main>
        </div>

    </>
  )
}

export default ItemConfigurationLanguage