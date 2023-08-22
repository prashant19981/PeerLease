import mongoose from 'mongoose';

const PropertiesSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        enum:['Single Room','Double Room','En-Suite'],
        required:true
    },
    city:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    university:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    grocery:{
        type: Number,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    amenities:{
        type: String,
        required: true
    },
    beds:{
        type: Number,
        required: true
    },
    baths:{
        type: Number,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    gurantor:{
        type: String,
        enum: ['Yes','No']
    },
    bills:{
        type: String,
        enum: ['Yes','No']
    },
    imageURL:{
        type:[String],
        required: true
    },
    deposit:{
        type: String,
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