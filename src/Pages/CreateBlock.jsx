import React from 'react'
import Layout from '../layout/layout'
import Footer from '../layout/Footer/Footer'
import CreateContent from '../containers/CreateContent'

const CreateBlock = () => {
    return (
        <Layout>
            <CreateContent />
            <Footer />
        </Layout>
    )
}

export default CreateBlock
