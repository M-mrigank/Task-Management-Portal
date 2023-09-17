import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/icon1.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import './Navbar.css'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setCurrentUser } from '../../actions/currentUser'
import { useNavigate} from 'react-router-dom';
import decode from "jwt-decode";
import { Route } from 'react-router-dom'
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes'

const Navbar = ({isLoggedIn, setIsLoggedIn}) => {

    // var User=JSON.parse(localStorage.getItem('Profile'));
    // console.log("printing user",User);
    var User=useSelector((state)=>state.currentUserReducer);
    useEffect(()=>{
        setIsLoggedIn(!isLoggedIn);
    }, [User]);
    console.log("printing user",User);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogout=()=>{
        dispatch({
            type:"LOGOUT",
        });
        navigate('/');
        dispatch(setCurrentUser(null));
    }

    useEffect(()=>{
        const token=User?.token;
        if(token){
            const decodeToken=decode(token);
            if(decodeToken.exp*1000<new Date().getTime()){
                handleLogout();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    }, [dispatch]);

  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo'>
                <img src={logo} width={40} alt='logo'/>
            </Link>
            <div className='box-block'>
                {
                    User!==null && (
                        <Link to='/Dashboard' className='nav-item nav-btn'>Dashboard</Link>
                    )
                }
                {
                    User!==null && (
                        <Link to={'/Questions'} className='nav-item nav-btn' activeClassname="active">Tasks</Link>
                    )
                }
                
                
                

                {
                    User===null?(
                        <Link to='/Auth' className='nav-item nav-links'>Log In</Link>
                    ):(
                        <>
                            {
                                User?.result.accountType==='Admin' && (
                                    <PrivateRoutes isLoggedIn={isLoggedIn}>
                                    <   Link to={'/Users'} className='nav-item nav-btn' activeClassname="active">Manage Users</Link>
                                    </PrivateRoutes>
                                )
                            }
                            <Avatar 
                                backgroundColor={'#009dff'}
                                px="10px"
                                py="7px"
                                borderRadius={"50%"}
                                color={"white"}
                                
                            >
                                <Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:"none"}}>
                                    {User.result.name.charAt(0).toUpperCase()}
                                </Link>
                            </Avatar>
                            <button className='nav-item nav-links' onClick={handleLogout}>Log Out</button>
                        </>
                    )
                }
            </div>
        </div>
    </nav>
  )
}

export default Navbar
