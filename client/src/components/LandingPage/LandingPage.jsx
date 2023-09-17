import React from 'react'
import { useSelector } from 'react-redux'
import "./LandingPage.css"
import pic from "../../assets/homepage.png";
import { Link } from 'react-router-dom';
import {BsArrowRightCircleFill} from "react-icons/bs"

const LandingPage = () => {
    const user=useSelector((state)=>state.currentUserReducer);
    // console.log("user ll", user);
  return (
    <div className='landing-page'>
        {
            user!==null ? (
                <h1>Welcome <span className='heading-style'>{user?.result?.name}</span></h1>
            ):(
                <div className='logout-page-heading'>
                    <h1>Login to View Your Task</h1>
                    <Link to={'/Auth'} className='lgn-btn'>
                        <p>Login</p>
                        <BsArrowRightCircleFill/>
                    </Link>
                </div>
            )
        }
      
      <div className='page-logo'>
        <img src={pic} alt="Home Page" width={"95%"}/>
      </div>
    </div>
  )
}

export default LandingPage
