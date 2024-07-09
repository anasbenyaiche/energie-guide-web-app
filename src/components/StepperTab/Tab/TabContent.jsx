import React from 'react'

const TabContent = ({ tabData, activeTab }) => {
    return (
        <div>
            {tabData[activeTab].content}
        </div>
    )
}

export default TabContent
