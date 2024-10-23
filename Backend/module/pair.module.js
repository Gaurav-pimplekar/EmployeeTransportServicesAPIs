import mongoose, { Schema } from "mongoose";


const pairSchema = new mongoose.Schema({
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
        unique:true,
    },
    driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Driver",
        unique:true
    }
})


pairSchema.index({ vehicle: 1, driver: 1 }, { unique: true });

const Pair = mongoose.model("pair", pairSchema);
export default Pair;