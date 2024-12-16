import mongoose from "mongoose";

const ConnectToMongoDb=(url)=>{
    return mongoose.connect(url);
}

export default ConnectToMongoDb