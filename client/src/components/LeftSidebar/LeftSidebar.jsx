import React from 'react'
import "./LeftSidebar.css"
import pen from "../../assets/pen-solid.svg"
import {NavLink} from "react-router-dom"
import { useSelector } from 'react-redux'

const LeftSidebar = () => {
  const user=useSelector((state)=>state.currentUserReducer);
  return (
    <div className='left-sidebar'>
      <div className='side-nav'>
        <NavLink to={'/'} className="side-nav-links" activeClassname="active">
          <p>Home</p>
        </NavLink>
        {
          user!==null && (
            <div className='side-nav-div'>
              <NavLink to={'/Questions'} className="side-nav-links" activeClassname="active">
                <img src={pen} width={15} alt='Globe'/>
                <p style={{paddingLeft:"10px"}}>Tasks</p>
              </NavLink>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default LeftSidebar
