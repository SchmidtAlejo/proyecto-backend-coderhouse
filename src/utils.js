import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from 'passport';
import { config } from './config/config.js';

export default __dirname;

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
  if (req && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
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