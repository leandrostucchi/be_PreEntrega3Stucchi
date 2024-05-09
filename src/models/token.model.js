import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const tokensCollection = "Token";

const tokenSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
});

tokenSchema.plugin(mongoosePaginate);
const TokenModel =  mongoose.model(tokensCollection, tokenSchema);
export default  TokenModel;
