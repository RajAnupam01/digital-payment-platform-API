import mongoose from "mongoose"

const beneficairySchema = new mongoose.Schema({
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    beneficairyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

},{timestamps:true})

const Beneficairy = mongoose.model("Beneficairy",beneficairySchema);

export default Beneficairy;