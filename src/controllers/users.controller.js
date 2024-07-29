import UserDAO from '../dao/UserDAO.js'
import fs from 'fs';
import path from 'path';
import { transporter } from '../utils/utils.js';

class UsersController {
  static getUsers = async (req, res) => res.success(await UserDAO.getAll());

  static updateAlternatePremium = async (req, res) => {
    const { uid } = req.params;

    try {
      const user = await UserDAO.getBy({ _id: uid });
      if (!user) {
        return res.badRequest('User not found');
      }

      if (user.role === 'premium') {
        await UserDAO.updateUser(uid, { role: 'user' });
        return res.success('Role updated to user');
      }

      const requiredDocuments = ['Identificacion', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
      const uploadedDocuments = user.documents.map(doc => doc.name.split(".")[0]);

      const missingDocuments = requiredDocuments.filter(doc => !uploadedDocuments.includes(doc));

      if (missingDocuments.length > 0) {
        return res.badRequest(`Missing documents: ${missingDocuments.join(', ')}`);
      }
      await UserDAO.updateUser(uid, { role: 'premium' });

      res.success('Role updated to premium');
    } catch (error) {
      res.error500(error.message);
    }
  }

  static updateUser = async (req, res) => res.success(await UserDAO.updateUser(req.params.uid, req.body));

  static uploadDocument = async (req, res) => {
    try {
      const userId = req.params.uid;
      const files = req.files;

      if (!files || files.length === 0) {
        return res.badRequest('No files were uploaded.');
      }
      const user = await UserDAO.getBy({ _id: userId });
      if (!user) {
        return res.badRequest('User not found.');
      }
      for (const file of files) {
        const existingDocument = user.documents.find(doc => doc.name === file.originalname);
        if (existingDocument) {
          fs.unlinkSync(path.resolve(existingDocument.reference));
          existingDocument.reference = file.path;
          await UserDAO.updateDocument(userId, existingDocument);
        } else {
          await UserDAO.updateUser(userId, { $push: { documents: { name: file.originalname, reference: file.path } } });
        }
      }

      res.success('Documents uploaded successfully.');
    } catch (error) {
      res.error500(error.message);
    }
  }

  static deleteUser = async (req, res) => {
    try {
      const { uid } = req.params;
      await UserDAO.deleteUser(uid);
      res.success('User deleted successfully');
    } catch (error) {
      res.error500(error.message);
    }
  }

  static deleteAllUsers = async (req, res) => {
    try {
      const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
      const inactiveUsers = await UserDAO.find({ last_connection: { $lt: twoDaysAgo } });
      const emails = inactiveUsers.map(user => user.email);
      await UserDAO.deleteAllUser(twoDaysAgo);

      emails.forEach(email => {
        transporter.sendMail({
          to: email,
          subject: 'Cuenta eliminada por inactividad',
          html: `Tu cuenta ha sido eliminada por inactividad.`
        });
      });

      res.success('All users deleted successfully');
    } catch (error) {
      res.error500(error.message);
    }
  }

  static generateTest = async (req, res) => {
    try {
      const result = await UserDAO.generateTest();
      res.success(result);
    } catch (error) {
      res.error500(error.message);
    }
  }
}

export default UsersController;