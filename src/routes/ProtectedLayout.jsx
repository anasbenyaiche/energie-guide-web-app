import React from 'react'
import ProtectedRoute from './ProtectedRoutes'
import { Outlet, useLocation } from 'react-router-dom'
import Layout from '../layout/layout'

const ProtectedLayout = () => {

    const location = useLocation();
    const showSidebar = location.pathname !== '/faq';
    return (
        <ProtectedRoute>
            <Layout showSidebar={showSidebar}>
                <Outlet />
            </Layout>
        </ProtectedRoute>
    )
}

export default ProtectedLayout
