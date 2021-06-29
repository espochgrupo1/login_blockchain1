import config from "../../config/config";
import { transporte } from "../../middledware/email";
class Email {
  private templateMessage: string;
  private urlRedirec: string;
  private userEmail: string;
  constructor() {
    this.templateMessage = process.env.TEMPLATE_RESETPASSWORD || "";
    this.urlRedirec = process.env.URL_REDIRECT || "";
    this.userEmail = process.env.USER_EMAIL || "";
  }
  public emailBasic(email: string, codigo: string) {
    return new Promise<boolean>((resolve, reject) => {
      try {
        const mailOptions = {
          from: config.userEmail,
          to: `${email}`,
          subject: `Codigo de verificación`,
          html: `
          Este es el codigo de verifiacion para iniciar sesion en el aplicativo
              ${codigo}
                `,
        };
        transporte
          .sendMail(mailOptions)
          .then((info) => {
            resolve(true);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}
export const emailController = new Email();
