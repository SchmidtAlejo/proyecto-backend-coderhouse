
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from 'passport';
import { config } from '../config/config.js';
import { faker } from '@faker-js/faker';
import nodemailer from 'nodemailer'

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const generateToken = (user) => {
  const token = jwt.sign({ user }, config.SECRET_TOKEN, { expiresIn: "1h" });
  return token;
}

export const verifyToken = (token) => {
  const tokenVerify = jwt.verify(token, config.SECRET_TOKEN);
  return tokenVerify;
}

export const coockieExtractror = (req) => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req && req.cookies.token) {
    token = req.cookies.token;
  }
  return token;
}

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).send({ error: info.message ? info.message : info.toString() });
      req.user = user;
      next();
    })(req, res, next);
  }
}

export const generateProduct = () => {
  return {
    _id: faker.database.mongodbObjectId(),
    status: faker.datatype.boolean(),
    title: faker.commerce.productName(),
    category: faker.commerce.department(),
    description: faker.lorem.sentence(),
    price: faker.commerce.price(),
    thumbnail: faker.image.url(),
    stock: faker.number.int({ min: 0, max: 100 }),
  };
};

export const generator = (cant, generate) => {
  const list = [];
  for (let i = 0; i < cant; i++) {
    list.push(generate);
  }
  return list;
}

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.USER_MAIL,
    pass: config.PASS_MAIL
  }
});