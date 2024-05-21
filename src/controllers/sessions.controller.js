import { generateToken } from '../utils.js';
import passport from 'passport';
import UserDTO from '../dao/dto/user.dto.js'

class SessionsController {
  static login = (req, res, next) => {
    passport.authenticate('login', { failureRedirect: '/login?error=Error 500 - error' }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const token = generateToken(user);
        res.cookie('token', token, { maxAge: 600000, httpOnly: true });
        // return res.status(200).json({ user, token });
        res.redirect('/products')
      });
    })(req, res, next);
  };

  static signup = (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "email exists" });
      }
      return res.status(200).json({ user });
    })(req, res, next);
  };

  static logout = (req, res) => {
    res.clearCookie('token');
    return res.redirect("/login");
  };

  static githubAuth = (req, res, next) => passport.authenticate("github", { scope: ['user:email'] }, () => { })(req, res, next);

  static githubCallback(req, res, next) {
    passport.authenticate("github", { failureRedirect: "/api/sessions/errorGitHub" }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Si la autenticación falla, puedes redirigir o enviar una respuesta de error
        return res.redirect('/login?error=Error 500 - error');
      }
      // Si la autenticación es exitosa, genera el token y envía la respuesta
      const token = generateToken(user);
      res.cookie('token', token, { maxAge: 600000, httpOnly: true });
      return res.status(200).json({ user, token });
    })(req, res, next);
  }

  static githubError = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.redirect('/login?error=Error 500 - error');
  };

  static getCurrentUser = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      const userDTO = new UserDTO(user)
      return res.status(200).json({ user });
    })(req, res, next)
  };
}

export default SessionsController;