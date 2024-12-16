import UserModel from "../models/User.js";
import shortid from "shortid"
import axios from "axios";


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
        res.json({url:`https://backend-traffic-lens.vercel.app/user/visit/${id}`,msg:"Succesfully Created !"});
    }
    catch(err){
        res.json({msg:"Error while creating !"})
        console.log(err);
    }
    }
}


const handleVisitUser=async(req,res)=>{
    const {id}=req.params;
    const ip=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    
        try {
            const response = await axios.get(`http://ip-api.com/json/${ip}`);
            const { city, country } = response.data;
            const user=await UserModel.findOneAndUpdate(
                {genId:id},
                {$push:{clicks:{timeStamp:Date.now(),ip:`${ip}`,userAgent:`${userAgent},`,city:`${city}`,country:`${country}`}}},
                {new:true});
            if (!user) {
                // If user is not found, return a 404 error
                return res.status(404).json({ error: "User not found" });
            }
            res.redirect(user.orignalUrl);
            
        } catch (error) {
            // console.error('Error fetching geolocation:', error);
            return res.status(401).json({ error: "Something Went Wrong !" });
          }
    
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
    const records=user.clicks.map((click)=>({ip:click.ip,city:click.city,country:click.country}));

    res.json({clicks:clicks,records:records});
}

export {
    handleCreateUser,
    handleVisitUser,
    handleAnalysisUser
}


