import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Routes} from 'react-router-dom';
import AllRoutes from "./AllRoutes"
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from './actions/question';
import {fetchAllUsers} from "./actions/users"
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes';


function App() {

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  
  return (
    <div className='App'>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <AllRoutes/>
      </Router>
    </div>
  );
}

export default App;
