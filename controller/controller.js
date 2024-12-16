import UserModel from "../models/User.js";
import shortid from "shortid"



const handleCreateUser=async(req,res)=>{
    if(!req.body.url || !req.body.websiteName){
        res.status(400).json({error:"url and websiteName is required"});
    }
    else{
        try{
        const Name=await UserModel.findOne({websiteName:req.body.websiteName});
        const url=await UserModel.findOne({websiteName:req.body.url});
        if(Name || url){
            return res.status(400).json({msg:"Either the Name or url already exist"});
        }
        const id=shortid.generate();
        const user= await UserModel.create({
            orignalUrl:req.body.url,
            genId:id,
            websiteName:req.body.websiteName,
            clicks:[]
        })
        res.json({url:`https://trafficlens-backend.vercel.app/user/visit/${id}`,msg:"Succesfully Created !"});
    }
    catch(err){
        res.json({msg:"Error while creating !"})
        console.log(err);
    }
    }
}


const handleVisitUser=async(req,res)=>{
    const {id}=req.params;
    console.log(id);
    const user=await UserModel.findOneAndUpdate(
        {genId:id},
        {$push:{clicks:{timeStamp:Date.now(),ip:`${req.ip}`}}},
        {new:true});
    if (!user) {
        // If user is not found, return a 404 error
        return res.status(404).json({ error: "User not found" });
    }
    res.redirect(user.orignalUrl);
    
}


const handleAnalysisUser=async (req,res) => {
    const{websiteName}=req.params;
    if(!websiteName){
        res.status(404).josn({error:"Website Name Required !"})
    }
    const user= await UserModel.findOne({websiteName:websiteName});
    // console.log(user);
    if(!user){
      return res.status(404).json({error:"User Not Found !"})
    }
    const clicks=user.clicks.length;
    const ips=user.clicks.map((click)=>(click.ip));
    res.json({clicks:clicks,ips:ips});
}

export {
    handleCreateUser,
    handleVisitUser,
    handleAnalysisUser
}


