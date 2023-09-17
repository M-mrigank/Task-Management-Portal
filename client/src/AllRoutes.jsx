import React from 'react'
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home"
import Auth from "./pages/Auth/Auth"
import Questions from './pages/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './pages/Questions/DisplayQuestion'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'
import ChartDiagram from "./components/chart/ChartDiagram"
import { useSelector } from 'react-redux'

const AllRoutes = () => {
  const questionList=useSelector((state)=>state.questionsReducer);
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Dashboard' element={<ChartDiagram questionList={questionList?.data}/>}/>
        <Route path='/Auth' element={<Auth/>}/>
        <Route path='/Questions' element={<Questions/>}/>
        <Route path='/AskQuestions' element={<AskQuestion/>}/>
        <Route path='/Questions/:id' element={<DisplayQuestion/>}/>
        <Route path='/Users' element={<Users/>}/>
        <Route path='/Users/:id' element={<UserProfile/>}/>
    </Routes>
  )
}

export default AllRoutes
