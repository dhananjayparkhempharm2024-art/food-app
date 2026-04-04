import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer-comp/Footer'
import NavLinks from '../components/nav-comp/NavLinks'
import '../index.css'
const Layout = () => {
    return (
        <>
            <NavLinks />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
