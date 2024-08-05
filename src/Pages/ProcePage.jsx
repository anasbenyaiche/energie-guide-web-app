import React from 'react'
import BlockSection from '../components/HeadSection/BlockSection'
import MenuPage from '../components/MenuPages/MenuPage'
import cover from '../assets/image/procedures.jpg'
const ProcePage = () => {
    return (
        <>
            <MenuPage />
            <BlockSection
                title="Procédures"
                article="100 Procédures"
                category="7 Catégories"
                picture={cover}
                description="Nullam ac gravida felis, in commodo mauris. Etiam dictum tincidunt enim,
             a laoreet lacus vulputate ut. Pellentesque vitae neque tempus lacus eleifend laoreet nec quis tortor.
              Sed dignissim rutrum elit. Maecenas pulvinar tempus ligula, a ultrices urna sollicitudin et. 
              Quisque ante nisl, dictum eget nisi sed, commodo ornare eros. Morbi sodales vehicula orci, 
              vel feugiat velit sodales nec. Nulla facilisi. Suspendisse nibh libero" />

        </>
    )
}

export default ProcePage
