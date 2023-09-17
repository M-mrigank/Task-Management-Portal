import React from 'react'
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"
import LandingPage from "../../components/LandingPage/LandingPage"
import "../../App.css"

const Home = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar/>
      <div className='home-container-2'>
        {/* <HomeMainbar/> */}
        <LandingPage/>
      </div>
    </div>
  )
}

export default Home
