import React, { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import upVote from "../../assets/sort-up.svg"
import downVote from "../../assets/sort-down.svg"
import "./Questions.css"
import Avatar from "../../components/Avatar/Avatar"
import DisplayAnswer from "./DisplayAnswer"
import { useDispatch, useSelector } from 'react-redux';
import {deleteQuestion, postAnswer, updateQuestion, voteQuestion} from "../../actions/question";
import moment from "moment";
import copy from "copy-to-clipboard";

const QuestionDetails = () => {

    const {id}=useParams();
    const questionList=useSelector((state)=>state.questionsReducer);
    const [answer, setAnswer]=useState('');
    const user=useSelector((state)=>(state.currentUserReducer));
    const accountType=user?.result?.accountType;
    const navigate=useNavigate();
    const dispatch=useDispatch();

    // console.log("hello", questionList?.data?.filter((question)=>question._id===id)[0].status)
    var status=questionList?.data?.filter((question)=>question._id===id)[0].status;
    console.log("status", status);
    console.log("id", id);
    console.log("questionlist", questionList);
    console.log("user", user);
    // console.log("ques id", questionList?.data[0]?.userId);
    // console.log("user  id", user?.result?._id);
    const handlePostAnswer=(event, answerLength)=>{
        event.preventDefault();
        console.log("chk1");
        if(user===null){
            console.log("chk2");
            alert("Login or Signup to create a task");
            navigate('/Auth');
        }
        else{
            if(answer===''){
                console.log("chk3");
                alert('Create task before submitting');
            }
            else{
                console.log("here i ammm")
                status='InProgress';
                dispatch(updateQuestion(id, {status}));
                dispatch(postAnswer({id, noOfAnswers:answerLength+1, answerBody:answer, userAnswered:user.result.name}));
                setAnswer("")
            }
        }
    }

    const location=useLocation();
    const url=`https://task-management-backend-w49p.onrender.com`
    // const url=`http://localhost:3000`

    const handleShare=()=>{
        copy(url+location.pathname);
        alert(`Copied url: ${url+location.pathname}`);
    }

    const handleDelete=()=>{
        dispatch(deleteQuestion(id, navigate));
    }

    const handleUpvote=()=>{
        dispatch(voteQuestion(id, 'upVote', user.result._id));
    }

    const handleDownvote=()=>{
        dispatch(voteQuestion(id, 'downVote', user.result._id));
    }

    const handlerCloseTask=()=>{
        status='Done';
        dispatch(updateQuestion(id, {status}));
    }

  return (
    <div className='question-details-page'>
      {
        questionList.data===null?(
            <h1>Loading...</h1>
        ):(
            <>
                {
                    questionList.data.filter(question=>question._id===id).map((question)=>(
                        <div key={question._id}>
                            <section className='question-details-container'>
                                <h1>Status : {
                                    status==='Assigned'?(
                                        <span className='col1'>{status}</span>
                                    ):(
                                        status==='Done'?(
                                            <span className='col3'>{status}</span>
                                        ):(
                                            <span className='col2'>{status}</span>
                                        )
                                    )
                                }</h1>
                                <h2>{question.questionTitle}</h2>
                                <div className='question-details-container-2'>
                                    <div style={{width:"100%"}}>
                                        <p className='question-body'>{question.questionBody}</p>
                                        <div className="question-details-tags">
                                            {
                                                question.questionTags.map((tag)=>(
                                                    <p key={tag}>{tag}</p>
                                                ))
                                            }
                                        </div>
                                        <div className="question-actions-user">
                                            <div>
                                                <button type='button' onClick={handleShare}>Share</button>
                                                {
                                                    user?.result?._id===question?.userId && (
                                                        <button type='button' onClick={handleDelete}>Delete</button>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <p>Created {moment(question.askedOn).fromNow()}</p>
                                                <Link to={`/user/${question.userId}`} className='user-link' style={{color:"#00086d8"}}>
                                                    <Avatar backgroundColor={"orange"} px={"8px"} py={"5px"}>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                    <div>
                                                        {
                                                            question.userPosted
                                                        }
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {
                                question.noOfAnswers!==0 && (
                                    <section>
                                        <h3>{question.noOfAnswers} Answers</h3>
                                        <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                                    </section>
                                )
                            }
                            <section className='post-ans-container'>
                                {
                                    accountType==='Admin'?(
                                        <h3>Add Explanation</h3>
                                    ):(
                                        <h3>Add Your Assignment</h3>
                                    )
                                }
                                
                                <form onSubmit={(event)=>{handlePostAnswer(event, question.answer.length)}}>
                                    <textarea name='' rows={10} cols={30} id='' onChange={(event)=>setAnswer(event.target.value)}></textarea>
                                    <br/>
                                    {
                                        accountType==='Admin'?(
                                            <div className='admin-control-btn'>
                                                <input type='submit' className='post-ans-btn' value="Add Review"/>
                                                <button onClick={handlerCloseTask} className='post-ans-btn'>Close Task</button>
                                            </div>
                                        ):(
                                            <>
                                                {
                                                    status!=='Done' ?(
                                                        <input type='submit' className='post-ans-btn' value="Submit"/>
                                                    ):(
                                                        <input type='submit' className='post-ans-btn1 post-not' value="Submit" disabled/>
                                                    )
                                                }
                                            </>
                                            
                                        )
                                    }
                                    
                                </form>
                                <p>Browse Questions Tagged
                                    {
                                        question.questionTags.map((tag)=>(
                                            <Link to={"/Tags"} key={tag} className='ans-tags'>{tag}</Link>
                                        ))
                                    } or
                                    <Link to={'/AsQuestion'} style={{textDecoration:"none", color:"#009dff"}}> ask your own question</Link>
                                </p>
                            </section>
                        </div>
                    ))
                }
            </>
        )
      }
    </div>
  )
}

export default QuestionDetails
