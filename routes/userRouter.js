import express from "express";
import { handleAnalysisUser, handleVisitUser,handleCreateUser } from "../controller/controller.js";

const router=express.Router();

//Routes

router.post('/create',handleCreateUser);
router.get('/visit/:id',handleVisitUser);
router.get('/analysis/:websiteName',handleAnalysisUser);


export default router;
