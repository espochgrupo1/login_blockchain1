"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporte = void 0;
const nodemailer = require("nodemailer");
const config_1 = require("../config/config");
require("dotenv").config();
exports.transporte = nodemailer.createTransport({
    service: "gmail",
    port: 8000,
    secure: false,
    auth: {
        user: config_1.default.userEmail,
        pass: config_1.default.passwordEmail,
    },
});
exports.transporte
    .verify()
    .then(() => {
    console.log("Conexion SMTP correcto");
})
    .catch((err) => {
    console.log("Ha Ocurrido Un Error");
    console.log(err);
});
//# sourceMappingURL=email.js.map