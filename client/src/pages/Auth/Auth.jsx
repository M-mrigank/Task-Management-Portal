import React, { useState } from 'react'
import './Auth.css'
import icon from '../../assets/icon1.png'
import { login, signup } from '../../actions/auth.js'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Auth = () => {

  const [isSignup, setIsSignup]=useState(false);
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const[accountType, setAccountType]=useState('User');

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleSwitch=()=>{
    setIsSignup(!isSignup);
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    if(!email && !password){
      alert("Enter email and password to continue");
    }
    if(isSignup){
      if(!name){
        alert("Enter name to continue");
      }
      dispatch(signup({name, email, password, accountType}, navigate));
      handleSwitch();
    }
    else {
      dispatch(login({email, password, accountType}, navigate));
    }
  }

  return (
    <section className='auth-section'>
      {
        isSignup && (
          <div className='accountype-btn'>
            <button
              onClick={()=>setAccountType('Student')}
              className='auth-btn'
              activeClassname="active"
            >
              Student
            </button>
            <button
              onClick={()=>setAccountType('Admin')}
              className='auth-btn'
              activeClassname="active"
            >
              Admin
            </button>
          </div>
        )
      }
      <div className='auth-container-2'>
        {
          !isSignup && <img src={icon} width={50} height={50} alt='stack overflow' className='login-logo'/>
        }
        <form onSubmit={handleSubmit}>
          {
            isSignup && (
              <label htmlFor='name'>
                <h4>Display Name</h4>
                <input type='text' id='name' name='name' onChange={(event)=>setName(event.target.value)}/>
              </label>
            )
          }
          <label htmlFor='email'>
            <h4>Email</h4>
            <input type='email' name='name' id='email' onChange={(event)=>setEmail(event.target.value)}/>
          </label>
          <label htmlFor='password'>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <h4>Password</h4>
              {!isSignup && <p style={{color:"#007ac6", fontSize:"13px"}}>Forgot Password</p>}
            </div>
            <input type='password' name='password' id='password' onChange={(event)=>setPassword(event.target.value)}/>
          </label>
          <button type='submit' className='auth-btn'>
            {
              isSignup?'Sign Up':'Log In'
            }
          </button>
          {
            isSignup && (
              <p style={{color:"#666767", fontSize:"13px"}}>
                By Clicking "Sign Up" you agree to our
                <span style={{color:"#007ac6"}}> terms ,<br/> service</span>,
                <span style={{color:"#007ac6"}}> privacy policy</span>
                <span style={{color:"#007ac6"}}> cookie policy</span>
              </p>
            )
          }
        </form>
        <p>
          {
            isSignup?'Already have an account?':"Don't have an account?"
          }
          <button type='button' className='handle-switch-btn' onClick={handleSwitch}>
            {
              isSignup?"Log In":"Sign Up"
            }
          </button>
        </p>
      </div>
    </section>
  )
}

export default Auth
