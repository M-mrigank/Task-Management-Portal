import mongoose from "mongoose";

const QuestionSchema=mongoose.Schema({
    questionTitle:{
        type:String,
        required:"Task must have title",
    },
    questionBody:{
        type:String,
        required:"Task must have body",
    },
    assinee:{
        type:"String",
    },
    assignedTo:{
        type:String,
        required:"Task must be assigned to a user",
    },
    deadline:{
        type:Date,
        required:"Task must have deadline",
    },
    questionTags:{
        type:[String],
        required:"Task must have tags",
    },
    noOfAnswers:{
        type:Number,
        default:0,
    },
    status:{
        type:String,
    },
    userPosted:{
        type:String,
        required:"Task must have author",
    },
    userId:{
        type:String,
    },
    askedOn:{
        type:Date,
        default:Date.now,
    },
    answer:[{
        answerBody:String,
        userAnswered:String,
        userId:String,
        answeredOn:{
            type:Date,
            default:Date.now,
        }
    }] 
});

export default mongoose.model("Question", QuestionSchema);