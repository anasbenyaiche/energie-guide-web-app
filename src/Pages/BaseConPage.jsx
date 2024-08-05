import React from 'react'
import BlockSection from '../components/HeadSection/BlockSection'
import cover from '../assets/image/base_de_connaisance.jpg'
import MenuPage from '../components/MenuPages/MenuPage'
const BaseConPage = () => {
    return (
        <>
            <MenuPage />
            <BlockSection
                title="Base de connaissances"
                article="20 Articles"
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

export default BaseConPage
