import mongoose from "mongoose";

import Questions from "../models/Questions.js";

export const postAnswer=async(req, res)=>{
    const {id:_id}=req.params;
    const {noOfAnswers, answerBody, userAnswered}=req.body;
    const userId=req.userId;
    // console.log("no of answers", noOfAnswers);
    // console.log("answer body", answerBody);
    // console.log("user ans", userAnswered);
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json("Question unavailable...");
    }
    updateNoOfQuestions(_id, noOfAnswers);
    try{
        const updatedQuestion= await Questions.findByIdAndUpdate(_id,{
            $addToSet: {
                answer: [{answerBody, userAnswered, userId}]
            }
        })
        return res.status(200).json(updatedQuestion)
    }
    catch(error){
        console.log("error: ",error)
        return res.status(400).json("error in updating");
    }
}

const updateNoOfQuestions=async(_id, noOfAnswers)=>{
    try{
        await Questions.findByIdAndUpdate(_id, {$set:{noOfAnswers:noOfAnswers}});
    }
    catch(error){
        console.log(error);
    }
} 

export const deleteAnswer=async(req, res)=>{
    const {id:_id}=req.params;
    const {answerId, noOfAnswers}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json("Question unavailable...");
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).json("Answer unavailable...");
    }
    updateNoOfQuestions(_id, noOfAnswers);
    try{
        await Questions.updateOne(
            {
                _id,
            },
            {
                $pull:{
                     'answer':{_id:answerId}
                }
            }
        );
        return res.status(200).json({message:"Successfully deleted..."});
    }
    catch(error){
        return res.status(405).json(error);
    }
}