import mongoose from 'mongoose';

const RequestsSchema = new mongoose.Schema({

    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    propertyID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Properties'
    },
    approved:{
        type: Boolean,
        default: false
    }
   


})
RequestsSchema.index(
    {userID:1 , propertyID:1},
    {unique:true});

export default mongoose.model("Requests",RequestsSchema);