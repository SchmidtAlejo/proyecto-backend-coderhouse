import TicketDAO from "../dao/TicketDAO.js";

export default class TicketService {
  static async createTicket(ticketData) {
    return TicketDAO.createTicket(ticketData);
  }
}