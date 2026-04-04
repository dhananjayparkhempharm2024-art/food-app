import React, { use, useContext } from 'react'
import Hero from '../components/dashboard-comp/Hero'
import Service from '../components/dashboard-comp/Service'
import Category from '../components/dashboard-comp/Category'
import Aboutus from '../components/dashboard-comp/Aboutus'
import Testimonoals from '../components/dashboard-comp/Testimonoals'

const DashBoard = () => {

  return (
    <div>
  <><Hero />
      <Service />
      <Category />
      <Aboutus />
      <Testimonoals /></>
    </div>
    
  )
}

export default DashBoard
