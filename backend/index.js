// const exp = require('constants');
import express from 'express';
const app = express();
import userRoute from "./routes/users.js"
import accommodationRoute from "./routes/accommodation.js"
import listingRoute from "./routes/listings.js"
import propertiesRoute from "./routes/properties.js"
import searchRoute from "./routes/search.js"
import authRoute from "./routes/auth.js"
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config()

// const publicPath = path.join(__dirname,'../frontend/build');

const connection = async () => {
    try{
        await mongoose.connect(process.env.MongoCred)
        console.log("Connected to Database")
    }
    catch (e){
        console.log("Conection to Database failed")
        throw e;
        
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("Disconnected from the Database")
})

app.use(express.json())
app.use("/auth",authRoute)
app.use("/users",userRoute)
app.use("/accom",accommodationRoute)
app.use("/listing",listingRoute)
app.use("/properties",propertiesRoute)
app.use("/search",searchRoute)
// app.use(express.static(publicPath));

app.get('/',(req,res) =>{
    // console.log(publicPath)
    // res.sendFile(path.join(publicPath,'index.html'));
    res.send('Hello backend')
})
app.listen(3000,() => {
    connection();
    console.log("Listening to port 3000");
})