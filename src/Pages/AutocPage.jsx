import React from 'react'
import HeadPageTitle from '../components/TitleSection/HeadPageTitle'
import MenuPage from '../components/MenuPages/MenuPage'
import AutoconsCardList from '../components/AutoconsCardList/AutoconsCardList'
const AutocPage = () => {
    return (
        <>
            <MenuPage />
            <HeadPageTitle
                title="Autoconsommation"
                subTitle="PROJETS D’AUTOCONSOMMATION (MT/HT)"
            />
            <AutoconsCardList title='Processus de développement des projets d’énergies renouvelablescdcedcedcedced' />
        </>
    )
}

export default AutocPage
