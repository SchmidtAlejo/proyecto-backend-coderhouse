import { ERRORES } from "../../errors/enums.js";

export const handleError = (error, req, res, next) => {

  req.logger.error(`${error.cause ? error.cause : error.stack}`);

  switch (error.code) {
    case ERRORES["ARGUMENTOS INVALIDOS"]:
      res.setHeader('Content-Type', 'application/json');
      return res.status(ERRORES["ARGUMENTOS INVALIDOS"]).json({ error: `${error.name}`, details: error.message })
      break

    case ERRORES["NOT FOUND"]:
      res.setHeader('Content-Type', 'application/json');
      return res.status(404).json({ error: "Recurso no encontrado" })
      break

    default:
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).json(
        {
          error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
          detalle: `${error.message}`
        }
      )
  }
}