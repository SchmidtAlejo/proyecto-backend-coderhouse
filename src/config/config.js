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
}