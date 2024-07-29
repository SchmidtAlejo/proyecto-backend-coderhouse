import { modelTicket } from "./models/tieckt.model.js";

export default class TicketDAO {
  static async createTicket(ticket) {
    return await modelTicket.create(ticket);
  }
}