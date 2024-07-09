import React from 'react'
import ProtectedRoute from './ProtectedRoutes'
import { Outlet } from 'react-router-dom'
import Layout from '../layout/layout'
import Footer from '../layout/Footer/Footer'

const ProtectedLayout = ({ showSidebar }) => {
    return (
        <ProtectedRoute>
            <Layout showSidebar={showSidebar}>
                <Outlet />
                <Footer />
            </Layout>
        </ProtectedRoute>
    )
}

export default ProtectedLayout
