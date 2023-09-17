import React, { useState } from 'react'
import "./AskQuestion.css"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { askQuestion } from '../../actions/question'

const AskQuestion = () => {

    const [questionTitle, setQuestionTitle]=useState('');
    const [questionBody, setQuestionBody]=useState('');
    const [questionTags, setQuestionTags]=useState('');
    const [assignedTo, setAssignedTo]=useState('');
    const [deadline, setDeadline]=useState();

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((state)=>(state.currentUserReducer));

    const handleSubmit=(event)=>{
        event.preventDefault();
        // console.log({questionTitle, questionBody, questionTags});
        dispatch(askQuestion({questionTitle, questionBody, questionTags, assignedTo, assinee:user?.result?.email, deadline, userPosted:user.result.name, status:'Assigned'}, navigate));
        
    }

    const handleEnter=(event)=>{
        if(event.key==='Enter'){
            setQuestionBody(questionBody+'\n');
        }
    }

  return (
    <div className='ask-question'>
        <div className="ask-ques-container">
            <h1>Create Task</h1>
            <form onSubmit={handleSubmit}>
                <div className="ask-form-container">
                    <label htmlFor='ask-ques-title'>
                        <h4>Title</h4>
                        <input type='text' id='ask-ques-title' placeholder="Enter Title here" onChange={(event)=>{setQuestionTitle(event.target.value)}} required/>
                    </label>

                    <label htmlFor='ask-ques-body'>
                        <h4>Description</h4>
                        <textarea id='ask-ques-body' cols={"30"} rows={"10"} onChange={(event)=>{setQuestionBody(event.target.value)}} onKeyPress={handleEnter} required/>
                    </label>

                    <label htmlFor='assigned-to'>
                        <h4>Assigned To</h4>
                        <input
                            id='assigned-to'
                            type='email'
                            placeholder='Enter email of user to be assigned'
                            onChange={(event)=>setAssignedTo(event.target.value)}
                            required
                        />
                    </label>

                    <label htmlFor='deadline'>
                        <h4>Deadline</h4>
                        <input
                            type='date'
                            id='deadline'
                            onChange={(event)=>setDeadline(event.target.value)}
                            required
                        />
                    </label>

                    <label htmlFor='ask-ques-tags'>
                        <h4>Tags</h4>
                        <p>Add up to 5 tags to describe what your task is about</p>
                        <input type='text' id='ask-ques-title' placeholder="Enter Tags" onChange={(event)=>{setQuestionTags(event.target.value.split(' '))}} required/>
                    </label>
                </div>
                <input type='submit' value={'Assign Task'} className='review-btn' />
            </form>
        </div>
    </div>
  )
}

export default AskQuestion
