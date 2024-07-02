import React, { useState } from 'react'
import TabButtons from './TabButtons'
import TabContent from './TabContent'
import Construction from '../Construction'
import Exploitation from '../Exploitation'
import success from '../../../assets/icon/success.png'
import success_white from '../../../assets/icon/success_white.png'
import sunenegywhite from '../../../assets/icon/sunenegywhite.png'
import sunenegy from '../../../assets/icon/sunenegy.png'
import construction from '../../../assets/icon/construction.png'
import constructionwhite from '../../../assets/icon/constructionwhite.png'
import settings from '../../../assets/icon/settings.png'
import settingswhite from '../../../assets/icon/settingswhite.png'
import Developp from '../Developp'
import Faisab from '../Faisab'




const Tab = () => {


    const [activeTab, setActivetab] = useState(0)


    const tabData = [
        {
            icon: success,
            title: 'Faisabilité',
            content: <Faisab />,
            icontab: success_white
        },
        {
            icon: construction,
            title: 'Développement',
            content: <Developp />,
            icontab: constructionwhite
        },
        {
            icon: settings,
            title: 'Construction',
            content: <Construction />,
            icontab: settingswhite
        },
        {
            icon: sunenegy,
            title: 'Exploitation',
            content: <Exploitation />,
            icontab: sunenegywhite
        },
    ]

    return (
        <div>
            <TabButtons
                activeTab={activeTab}
                setActivetab={setActivetab}
                tabData={tabData}
            />
            <TabContent
                tabData={tabData}
                activeTab={activeTab}
            />

        </div>
    )
}

export default Tab
