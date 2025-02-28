import dotenv from "dotenv";

dotenv.config();

const config = {
  port: Number(process.env.PORT ?? 3001),
  jwt_secret: process.env.JWT_SECRET ?? "jwt_secret_key",
  salt: Number(process.env.SALT) ?? 10
};

export default config;
