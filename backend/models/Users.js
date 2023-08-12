import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    isSeller:{
        type: Boolean,
        default:false
    },
    interestedProperty:[{
        property:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Properties'
        },
        approved:{
            type: Boolean,
            default: false
        }
    }],
    myProperty:[{
        property:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Properties'
        },
        approved:{
            type: Boolean,
            default: false
        }
    }]



})

export default mongoose.model("Users",UsersSchema);