"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailController = void 0;
const config_1 = require("../../config/config");
const email_1 = require("../../middledware/email");
class Email {
    constructor() {
        this.templateMessage = process.env.TEMPLATE_RESETPASSWORD || "";
        this.urlRedirec = process.env.URL_REDIRECT || "";
        this.userEmail = process.env.USER_EMAIL || "";
    }
    emailBasic(email, codigo) {
        return new Promise((resolve, reject) => {
            try {
                const mailOptions = {
                    from: config_1.default.userEmail,
                    to: `${email}`,
                    subject: `Codigo de verificación`,
                    html: `
          Este es el codigo de verifiacion para iniciar sesion en el aplicativo
              ${codigo}
                `,
                };
                email_1.transporte
                    .sendMail(mailOptions)
                    .then((info) => {
                    resolve(true);
                })
                    .catch((err) => {
                    console.log(err);
                    reject(err);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.emailController = new Email();
//# sourceMappingURL=email.controller.js.map