import { Router } from "express"
import { coockieExtractror, verifyToken } from "../utils/utils.js"

export class CustomRouter {
  constructor() {
    this.router = Router()
    this.init()
  }

  init() { }

  getRouter() {
    return this.router
  }

  get(ruta, permisos = [], ...funciones) {
    this.router.get(ruta, this.customResponses, this.accesos(permisos), this.procesaFunciones(funciones))
  }

  post(ruta, permisos = [], ...funciones) {
    this.router.post(ruta, this.customResponses, this.accesos(permisos), this.procesaFunciones(funciones))
  }

  put(ruta, permisos = [], ...funciones) {
    this.router.put(ruta, this.customResponses, this.accesos(permisos), this.procesaFunciones(funciones))
  }

  delete(ruta, permisos = [], ...funciones) {
    this.router.delete(ruta, this.customResponses, this.accesos(permisos), this.procesaFunciones(funciones))
  }

  procesaFunciones(funciones = []) {
    return funciones.map(fn => {
      return async (...params) => {
        try {
          fn(...params)
        } catch (error) {
          return params[1].error500(`${error.message}`)
        }
      }
    })
  }

  customResponses(req, res, next) {

    res.successCreate = (response) => {
      res.setHeader('Content-Type', 'application/json');
      return res.status(201).json({ message: response });
    }

    res.success = (response) => {
      res.setHeader('Content-Type', 'application/json');
      return res.status(200).json({
        message: response
      });
    }

    res.badRequest = (error) => {
      res.setHeader('Content-Type', 'application/json');
      return res.status(400).json({ error })
    }

    res.error401 = (error) => {
      res.setHeader('Content-Type', 'application/json');
      return res.status(401).json({ error })
    }

    res.error403 = (error) => {
      res.setHeader('Content-Type', 'application/json');
      return res.status(403).json({ error })
    }

    res.error404 = (error) => {
      res.setHeader('Content-Type', 'application/json');
      return res.status(404).json({ error })
    }

    res.error500 = (error) => {
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).json({ error })
    }

    next()

  }

  accesos(permisos = []) {
    return (req, res, next) => {
      if (!Array.isArray(permisos)) {
        return res.error500("Permisos de la ruta mal definidos. Contacte al administrador")
      }

      permisos = permisos.map(p => p.toLowerCase())
      if (permisos.includes("public")) {
        return next()
      };
      if (!req.headers.authorization && !req.cookies.token) {
        return res.error401("Usuario no autenticado / falta token")
      }

      let token = coockieExtractror(req);
      let user = null;
      try {
        user = verifyToken(token)
        user = user.user
        req.user = user
      } catch (error) {
        return res.error401(`Error de autenticacion: ${error.message}`)
      }

      if (permisos.includes("authenticated")) {
        return next();
      }

      if (!permisos.includes(user.role.toLowerCase())) {
        return res.error403("No tiene privilegios suficientes para acceder al recurso solicitado")
      }
      return next()

    }

  }

}