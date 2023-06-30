import mongoose from 'mongoose';

const PropertiesSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required:true
    }


})

export default mongoose.model("Properties",PropertiesSchema);