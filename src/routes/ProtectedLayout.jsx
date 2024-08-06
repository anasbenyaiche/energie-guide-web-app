import React from 'react'
import ProtectedRoute from './ProtectedRoutes'
import { Outlet } from 'react-router-dom'
import Layout from '../layout/layout'

const ProtectedLayout = () => {

    return (
        <ProtectedRoute>
            <Layout showSidebar={true}>
                <Outlet />
            </Layout>
        </ProtectedRoute>
    )
}

export default ProtectedLayout
