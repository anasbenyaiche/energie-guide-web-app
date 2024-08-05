import React from 'react'
import MenuPage from '../../components/MenuPages/MenuPage'
import HeadSubTitle from '../../components/SubTitleSection/HeadSubTitle'
import Tab from '../../components/StepperTab/Tab/Tab'
import pict_subtitle from '../../assets/image/pict_subtitle.jpg'
const SansTranPage = () => {
    return (
        <div>
            <MenuPage />
            <HeadSubTitle title='Projets sans transport d’électricité (sur site)'
                subTitle='Projets d’autoconsommation (MT/HT)'
                text='Les étapes principales d’un projet d’autoconsommation sans transport d’électricité'
                pic={pict_subtitle}
            />
            <Tab />
        </div>
    )
}

export default SansTranPage
