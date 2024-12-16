import express from "express";
import { handleAnalysisUser, handleVisitUser,handleCreateUser } from "../controller/controller.js";

const router=express.Router();

//Routes
// router.get('/creat',(req,res)=>{
//     res.send("api calling correct")
// });

router.post('/create',handleCreateUser);
router.get('/visit/:id',handleVisitUser);
router.get('/analysis/:websiteName',handleAnalysisUser);


export default router;

// import express from "express";
// import { handleCreateUser, handleVisitUser, handleAnalysisUser } from "../controller/user.js";

// const router = express.Router();

// // Routes
// router.get('/creat', (req, res) => {
//     res.send("api calling correct");
// });
// router.post('/create', handleCreateUser);
// router.get('/visit/:id', handleVisitUser);
// router.get('/analysis/:websiteName', handleAnalysisUser);

// export default router;
