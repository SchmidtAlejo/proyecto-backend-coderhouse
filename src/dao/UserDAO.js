import { createHash } from "../utils/utils.js";
import { modelUser } from "./models/user.model.js";

export default class UserDAO {

    static async create(user) {
        let newUser = await modelUser.create(user)
        return newUser.toJSON()
    }

    static async getAll() { return await modelUser.find({}, 'first_name last_name email role').lean() }

    static async getBy(filter) {
        return await modelUser.findOne(filter).lean()
    }

    static async find(filter) {
        return await modelUser.find(filter).lean()
    }

    static async updatePassword(userId, password) {
        return await modelUser.findByIdAndUpdate(userId, { password: password }, { new: true }).lean()
    }

    static async updateUser(userId, user) {
        console.log(user);
        return await modelUser.findByIdAndUpdate(userId, user).lean()
    }

    static async updateLastConnection(userId) {
        return await modelUser.findByIdAndUpdate(userId, { last_connection: new Date() }).lean()
    }

    static async deleteUser(userId) {
        return await modelUser.findByIdAndDelete(userId).lean()
    }

    static async deleteAllUser(time) {
        return await modelUser.deleteMany({ last_connection: { $lt: time }, role: 'user' });
    }

    static async generateTest() {
        return await modelUser.insertMany([
            {
                first_name: "admin",
                last_name: "admin",
                email: "adminCoder@coder.com",
                password: createHash("adminCod3r123"),
                role: "admin",
                last_connection: new Date()
            },
            {
                first_name: "user",
                last_name: "user",
                email: "userCoder@coder.com",
                password: createHash("userCod3r123"),
                role: "user",
                last_connection: new Date()
            }
        ])
    }

    static async updateDocument(id, document) {
        return await modelUser.findOneAndUpdate(
            { '_id': id, 'documents.name': document.name },
            { $set: { 'documents.$.reference': document.reference } },
            { new: true },
        );
    }
}