import React from 'react'
import ProtectedRoute from './ProtectedRoutes'
import { Outlet } from 'react-router-dom'
import Layout from '../layout/layout'
import Footer from '../layout/Footer/Footer'
import FooterE from '../layout/Footer/FooterE'

const ProtectedLayout = ({ showSidebar }) => {
    return (
        <ProtectedRoute>
            <Layout showSidebar={showSidebar}>
                <Outlet />
            </Layout>
        </ProtectedRoute>
    )
}

export default ProtectedLayout
