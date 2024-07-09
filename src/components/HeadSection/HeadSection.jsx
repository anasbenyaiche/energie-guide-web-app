import React from 'react'
import cover from '../../assets/coverbc.png'
import BlockSection from './BlockSection'

const HeadSection = () => {
    return (
        <>
            <BlockSection title="Base de connaissances"
                article="20 Articles"
                category="7 Catégories"
                picture={cover}
                description="Nullam ac gravida felis, in commodo mauris. Etiam dictum tincidunt enim,
                 a laoreet lacus vulputate ut. Pellentesque vitae neque tempus lacus eleifend laoreet nec quis tortor.
                  Sed dignissim rutrum elit. Maecenas pulvinar tempus ligula, a ultrices urna sollicitudin et. 
                  Quisque ante nisl, dictum eget nisi sed, commodo ornare eros. Morbi sodales vehicula orci, 
                  vel feugiat velit sodales nec. Nulla facilisi. Suspendisse nibh libero"
            />
        </>
    )
};



export default HeadSection
