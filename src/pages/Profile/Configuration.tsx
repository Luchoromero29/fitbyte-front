
import HeaderPage from "../../components/HeaderPage"

import ItemConfigurationTheme from "../../components/Configuration/ItemConfigurationTheme";
import ItemConfigurationUnits from "../../components/Configuration/ItemConfigurationUnits";
import ItemConfigurationLanguage from "../../components/Configuration/ItemConfigurationLanguage";
import ItemConfigurationCustomMode from "../../components/Configuration/ItemConfigurationCustomMode";


const Configuration = () => {


    
  


  return (
    <>
        <div>
            <header>
                <HeaderPage title="Configuración" path="/user/profile"/>
            </header>
            <main className="p-6 flex flex-col gap-3">
                <ItemConfigurationTheme label="Tema"/>
                <ItemConfigurationUnits label="Unidades de peso"/>
                <ItemConfigurationCustomMode label="Modo personalizado"/>
                <ItemConfigurationLanguage  label="Idioma"/>
            </main>
        </div>
    </>
  )
}

export default Configuration