import express from "express";
import {AskQuestion} from "../controllers/Questions.js"
import {getAllQuestions, deleteQuestion, voteQuestion, updateQuestion} from "../controllers/Questions.js"
import auth from "../middleware/auth.js"

const router=express.Router();

router.post('/Ask', auth, AskQuestion);
router.get('/get', auth, getAllQuestions);
router.delete('/delete/:id', deleteQuestion);
router.patch(`/update/:id`, auth, updateQuestion);

export default router;