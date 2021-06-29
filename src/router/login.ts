import { CrudCodesSecuriry } from "./../controllers/Crud/codes.controller";
import { error, succes } from "./../controllers/Response/response";
import { emailController } from "./../controllers/Email/email.controller";
import { IUser } from "../interfaces/user.interface";
import { crudUser } from "../controllers/Crud/user.controller";
import { loginController } from "../controllers/Crud/login.controller";
import * as express from "express";
import { IDataBlocchain } from "../interfaces/block.interface";
import { JsonWebtoken } from "../middledware/jwt";
import { v4 as uuidv4 } from "uuid";
import { crudCodeSecuriry } from "../controllers/Crud/codes.controller";
import { ICodeSecurity } from "src/interfaces/code";
import { blockChainController } from "../controllers/Blockchain/blockchain.controller";
export class LoginRouter {
  public router: express.Router;
  public uri: string;
  private jsonWebtoken: JsonWebtoken;
  constructor() {
    this.router = express.Router();
    this.uri = "/login";
    this.jsonWebtoken = new JsonWebtoken();

    this.config();
  }

  public config(): void {
    this.signIn();
    this.logOut();
    this.validateCode();

    // End config function
  }

  public signIn() {
    this.router.post(
      "/signin",
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          console.log(req.body);
          const validateuser: IDataBlocchain =
            await loginController.verifiLogin(req.body);
          if (validateuser) {
            const user: IUser = await crudUser.findByid(
              validateuser.block.use_id
            );
            const code: string = uuidv4().slice(0, 6);
            const bodycode = {
              use_id: validateuser.block.use_id,
              cod_value: code,
              is_valid: true,
            };
            const responseCode: ICodeSecurity = await crudCodeSecuriry.create(
              bodycode
            );
            if (responseCode.cod_id) {
              const responseemail: boolean = await emailController.emailBasic(
                user.use_email,
                code
              );
              responseemail
                ? succes(req, res, "Correo enviado correctamente", 200)
                : error(req, res, "Error al enviar correo", 500);
            } else {
              error(req, res, "Ha ocurrido un error", 500);
            }
          } else {
            error(req, res, "Datos Incorrectos", 422);
          }
        } catch (err) {
          console.log(err);
          error(req, res, "Ha ocurrido un error", 500);
        }
      }
    );
  }

  public validateCode() {
    this.router.get(
      "/validate/:id",
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          if (req.params.id) {
            const response: any = await crudCodeSecuriry.findFilter(
              req.params.id
            );
            if (response.rows[0].is_valid) {
              const user: IUser = await crudUser.findByid(
                response.rows[0].use_id
              );
              const userfind = await blockChainController.findUser(
                user.use_email
              );
              if (userfind) {
                const datosUser = {
                  name: user.use_name,
                  valido: user.is_valid,
                  iduse: user.use_id,
                };
                const token = await this.jsonWebtoken.sign(datosUser);
                succes(req, res, token, 200);
                crudCodeSecuriry.update(
                  { is_valid: false },
                  response.rows[0].cod_id
                );
              } else {
                error(req, res, "Codigo invalido", 200);
              }
            } else {
              error(req, res, "Codigo invalido", 200);
            }
          } else {
            error(req, res, "No hay codigo para validar", 400);
          }
        } catch (err) {
          console.error(err);
          error(req, res, "ha ocurrido un error", 500);
        }
      }
    );
  }

  public logOut() {
    this.router.get(
      "/logout",
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          res.status(200).send({ message: "done" });
        } catch (err) {
          console.log("Error - activate Deactivate Microphone - ", err);
          next(err);
        }
      }
    );
  }
}
