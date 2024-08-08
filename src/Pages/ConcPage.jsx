import React from 'react'
import HeadPageTitle from '../components/TitleSection/HeadPageTitle'
import MenuPage from '../components/MenuPages/MenuPage'
import AutoconsCardList from '../components/AutoconsCardList/AutoconsCardList'
const ConcPage = () => {
    return (
        <>
            <MenuPage />
            <HeadPageTitle
                title="Concessions"
                subTitle="PROJETS De Concession (MT/HT)"
            />
            <AutoconsCardList title='Processus de développement des projets d’énergies renouvelablescdcedcedcedced' />
        </>
    )
}

export default ConcPage
