import React from 'react'
import HeadPageTitle from '../components/TitleSection/HeadPageTitle'
import MenuPage from '../components/MenuPages/MenuPage'
import AutoconsCardList from '../components/AutoconsCardList/AutoconsCardList'
const AutorPage = () => {
    return (
        <>
            <MenuPage />
            <HeadPageTitle
                title="Autorisation"
                subTitle="PROJETS D'Autorisations (MT/HT)"
            />
            <AutoconsCardList title='Processus de développement des projets d’énergies renouvelablescdcedcedcedced' />
        </>
    )
}

export default AutorPage
