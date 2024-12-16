import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import ConnectToMongoDb from "./connect.js"
import router from "./routes/userRouter.js";

const app=express();
dotenv.config();
const url=`${process.env.DB_BASE_URL}`;
const PORT=process.env.PORT || 4000;


// Connection
ConnectToMongoDb(url)
.then(()=>{
    console.log("Successfully Connected !")
})
.catch((err)=>{
    console.log(err);
})


//middlewares
app.use(cors());
// app.use(cors({
//     origin: 'https://trafficlens-frontend.vercel.app', // Your live frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
// }));
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Succefully Done !");
})

app.use("/user",router);


app.listen(PORT,()=>{
    console.log(`Server Started at port ${PORT}.`)
})
