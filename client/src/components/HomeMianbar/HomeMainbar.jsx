import React, { useEffect, useMemo, useState } from 'react'
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

  const [quesStatus, setQuesStatus]=useState();
  const [selectAssigTo, setSelectAssigTo]=useState();
  
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
  
  const [selectData, setSelectData]=useState(listOfQuestions);
  const sarr=listOfQuestions?.map((data)=>data?.status);
  const statusArray=sarr?.filter((data, index)=>sarr?.indexOf(data)===index);

  console.log("status arry", statusArray);

  const assarr=listOfQuestions?.map((data)=>data?.assignedTo);
  const assignedToArray=assarr?.filter((data, index)=>assarr?.indexOf(data)===index);

  console.log("ass to arr", assignedToArray);

  const checkAuth=()=>{
    if(user===null){
      alert("Login or Signup to ask question");
      navigate('/Auth');
    }
    else{
      navigate('/AskQuestions');
    }
  }
  
  
  function getFilteredData(){
    if(!quesStatus && !selectAssigTo){
      console.log("here");
      return selectData;
    }
    if(quesStatus && !selectAssigTo){
      return selectData?.filter((data)=>data?.status===quesStatus);
    }
    if(!quesStatus && selectAssigTo){
      return selectData?.filter((data)=>data?.assignedTo===selectAssigTo);
    }
    if(quesStatus && selectAssigTo){
      return selectData?.filter((data)=>(data?.assignedTo===selectAssigTo && data?.status===quesStatus));
    }
  }

  var finalFilteredData=useMemo(getFilteredData, [quesStatus, selectAssigTo, selectData]);

  console.log("filter data", finalFilteredData);

  useEffect(()=>{
    setSelectData(listOfQuestions);
  }, []);

  const handleStatus=(event)=>{
    setQuesStatus(event?.target?.value);
  }

  const handleassine=(event)=>{
    setSelectAssigTo(event?.target?.value);
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
            <div className='box-style'>
              <p>{questionList.data.length} Tasks Assigned</p>
              {
                accountType==='Admin' && (
                  <div className='filter-box'>
                    <div className='filter-box-1'>
                      <label htmlFor="status">Status</label>
                      <select
                        name='status'
                        id='status'
                        onChange={handleStatus}
                        className='select-style'
                      >
                        <option value={""} disabled selected>Status</option>
                        {
                          statusArray?.map((data, index)=>(
                            <option key={index} value={data} className='option-style'>
                              {data}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                    <div className='filter-box-1'>
                      <label htmlFor="assignedTo">Assigned To</label>
                      <select
                        name='assignedTo'
                        id='assignedTo'
                        onChange={handleassine}
                        className='select-style'
                      >
                        <option value={""} disabled selected>Assigned To</option>
                        {
                          assignedToArray?.map((data, index)=>(
                            <option key={index} value={data} className='option-style'>
                              {data}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  </div>
                )
              }
              {
                questionList?.data?.length>0 && (
                  <div>
                    <QuestionList questionList={finalFilteredData}/>
                    {/* <QuestionList questionList={questionList.data}/> */}
                  </div>
                )
              }
              
            </div>
          )
        }
      </div>
    </div>
  )
}

export default HomeMainbar
