import mongoose from 'mongoose';

const PropertiesSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required:true
    },
    city:{
        type: String,
        required: true
    },
    university:{
        type: String,
        required: true
    },
    imageURL:{
        type:[String],
        required: true
    },
    interestedUser:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Users'
        },
        approved:{
            type: Boolean,
            default: false
        }
    }]


})

export default mongoose.model("Properties",PropertiesSchema);