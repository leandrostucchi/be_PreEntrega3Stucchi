import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const ticketsCollection = "Tickets";


const TicketsSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    purchase_datetime: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchase_email: {
        type: String,
        required: true
    }
});

TicketsSchema.plugin(mongoosePaginate);
const TicketModel =  mongoose.model(ticketsCollection, TicketsSchema);
export default  TicketModel;