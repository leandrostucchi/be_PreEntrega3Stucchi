import { TicketServices } from "../services/ticket.services.js";

class TicketsDAO {

    static insert(code,purchase_datetime,amount,purchase_email) {
        return TicketServices.insert(code,purchase_datetime,amount,purchase_email);
    }
    
    static getTicketByID(id) {
        return TicketServices.getTicketByID({_id:id});
    }
    
    
    static updateTicket(data, newData) {
        return TicketServices.updateTicket(data, newData);
    }

    static ValidByID(id,amount) {
        return this.ValidByID(id,amount);
    }
}
    
export default ticketDAO;
