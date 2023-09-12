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
import cors from 'cors';
import cookieParser from 'cookie-parser';
import requestRoute from "./routes/requests.js";
import Stripe from 'stripe';


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
app.use(cors({origin:process.env.URL,credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use("/auth",authRoute);
app.use("/users",userRoute);
app.use("/accom",accommodationRoute);
app.use("/listing",listingRoute);
app.use("/properties",propertiesRoute);
app.use("/search",searchRoute);
app.use("/request",requestRoute);

const stripe = new Stripe(process.env.STRIPE_SECREY_KEY,{
    apiVersion: "2023-08-16"
})

// app.use(express.static(publicPath));

app.get('/',(req,res) =>{
    // console.log(publicPath)
    // res.sendFile(path.join(publicPath,'index.html'));
    res.send('Hello backend')
})
app.get("/config",(req,res) =>{
    // console.log(process.env.STRIPE_PUBLISH_KEY);
    // console.log(process.env.STRIPE_SECREY_KEY);
    res.send({
        publishableKey: process.env.STRIPE_PUBLISH_KEY,
    });
});
app.post("/create-payment-intent", async (req,res)=>{
    try{
        const payment = await stripe.paymentIntents.create({
            currency:"GBP",
            amount:450,
            automatic_payment_methods:{enabled:true},
        });
        res.send({
            clientSecret: payment.client_secret,
        })
    }
    catch(e){
        return res.send(e);
    }
})
app.listen(3000,() => {
    connection();
    console.log("Listening to port 3000");
})



