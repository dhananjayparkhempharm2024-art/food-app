import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Home = () => {
  // console.log('home')
  return (
    <div>
    
      <NavLink />
      <Outlet />
      <footer />
    </div>
  )
}

export default Home
