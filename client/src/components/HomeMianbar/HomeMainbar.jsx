import React, { useEffect } from 'react'
import "./HomeMainbar.css"
import {useLocation, Link, useNavigate} from "react-router-dom"
import QuestionList from './QuestionList';
import {useSelector} from "react-redux";

const HomeMainbar = () => {

  const questionList=useSelector((state)=>state.questionsReducer);
  var listOfQuestions=[];
  listOfQuestions=questionList?.data;

  // console.log("ques",questionList);
  // console.log("queslist",listOfQuestions);

  const location=useLocation();
  const user=useSelector((state)=>state.currentUserReducer);
  const accountType=user?.result?.accountType;
  const userEmail=user?.result?.email;
  // console.log("user email", userEmail);
  // console.log("ques lis", questionList);
  // console.log("account type", accountType);
  const navigate=useNavigate();

  if(accountType==='Admin'){
    listOfQuestions=listOfQuestions?.filter((data)=>data?.assinee===userEmail);
  }
  else if(accountType==='User'){
    listOfQuestions=listOfQuestions?.filter((data)=>data?.assignedTo===userEmail);
  }

  const checkAuth=()=>{
    if(user===null){
      alert("Login or Signup to ask question");
      navigate('/Auth');
    }
    else{
      navigate('/AskQuestions');
    }
  }

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {
          location.pathname==='/'?(
            <h1>Tasks</h1>
          ):(
            <h1>All Tasks</h1>
          )
        }
        {
          accountType==='Admin' && (
            <button onClick={checkAuth} className='ask-btn'>Create Task</button>
          )
        }
      </div>
      <div>
        {
          questionList?.data===null?(
            <h1>Loading...</h1>
          ):(
            <>
              <p>{questionList.data.length} Tasks Assigned</p>
              {
                questionList?.data?.length>0 && (
                  <>
                    <QuestionList questionList={listOfQuestions}/>
                    {/* <QuestionList questionList={questionList.data}/> */}
                  </>
                )
              }
              
            </>
          )
        }
      </div>
    </div>
  )
}

export default HomeMainbar
