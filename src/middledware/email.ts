import * as nodemailer from "nodemailer";
import config from "../config/config";
require("dotenv").config();

export const transporte = nodemailer.createTransport({
  service: "gmail",
  port: 8000,
  secure: false,
  auth: {
    user: config.userEmail,
    pass: config.passwordEmail,
  },
});
transporte
  .verify()
  .then(() => {
    console.log("Conexion SMTP correcto");
  })
  .catch((err) => {
    console.log("Ha Ocurrido Un Error");
    console.log(err);
  });
