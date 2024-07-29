import dotenv from "dotenv"

dotenv.config(
  {
    path: "./.env",
    override: true
  }

)

export const config = {
  SECRET_TOKEN: process.env.SECRET_TOKEN,
  GITHUB_SECRET: process.env.GITHUB_SECRET,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  MONGO_URI: process.env.MONGO_URI,
  DB_NAME: process.env.DB_NAME,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SERVER_PORT: process.env.SERVER_PORT,
  USER_MAIL: process.env.EMAIL_USER,
  PASS_MAIL: process.env.EMAIL_PASS,
  API_URL: process.env.API_URL
}

export const swaggerOptions = (__dirname) => {
  return {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API de Productos",
        version: "1.0.0",
        description: "API de productos",
      },
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
  }
}