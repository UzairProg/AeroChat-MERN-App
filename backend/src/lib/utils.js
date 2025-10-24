import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { ENV } from "./env.js"

dotenv.config()

const JWT_SECRET = ENV.JWT_SECRET

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks: cross-site scripting
    sameSite: "strict", // CSRF attacks
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
}
