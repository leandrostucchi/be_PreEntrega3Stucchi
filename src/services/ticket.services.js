import Ticket from "../models/tickets.model.js";


async function insert(code,purchase_datetime,amount,purchase_email) {
    return await new Ticket({code,purchase_datetime,amount,purchase_email}).save();
}

async function getTicketByID(id) {
    return await Ticket.findOne({_id:id}).lean();
}


async function updateTicket(data, newData) {
    return await Ticket.findByIdAndUpdate({_id:data._id},{$set: newData})
                        .then(success => console.log('Actualizacion OK'))
                        .catch(error =>{
                                if(error){
                                    console.log('Error al actualizar ' + error);
                                    process.exit();
                                }
                });
}

async function ValidByID(id,amount) {
    let existe = true;
    let ticket = getTicketByID(id);
    if(ticket.amount < amount){
        existe = false;   
    }
    return existe;
}

export const TicketServices = {
        insert,
        getTicketByID,
        updateTicket,
        ValidByID,
}