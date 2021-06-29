import { error, succes } from "../controllers/Response/response";
import { IDataBlocchain } from "./../interfaces/block.interface";
import * as express from "express";
import { blockChainController } from "../controllers/Blockchain/blockchain.controller";
import { registerController } from "../controllers/Crud/register.controller";
import { tokenValidate } from "../middledware/validatetoken";
import { IResponseCrudUser, IUser } from "../interfaces/user.interface";
import { crudUser } from "../controllers/Crud/user.controller";
export class RegisterRotuter {
  public router: express.Router;
  public uri: string;
  constructor() {
    this.router = express.Router();
    this.uri = "/register";
    this.config();
  }

  public config(): void {
    this.register();
    this.getUser();
    // End config function
  }
  // Metodo para registrar un usuario
  public register() {
    this.router.post(
      "/",
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          const finduser = await blockChainController.findUser(
            req.body.use_email
          );
          console.log("Buscando Usuario en blockchain", finduser);
          if (finduser === undefined) {
            const user: IUser = {
              use_name: req.body.use_name,
              use_lastname: req.body.use_lastname,
              use_phone: req.body.use_phone,
              use_email: req.body.use_email,
              is_valid: true,
            };
            const responseUser: IUser = await crudUser.create(user);
            if (!responseUser.use_id) {
              error(req, res, "Ha ocurrido un error", 500);
            } else {
              const responseblockchain =
                await registerController.registerUserInBlock(
                  req.body.use_email,
                  req.body.wallet,
                  responseUser.use_id
                );
              responseblockchain
                ? succes(req, res, "Usuario Registrado", 201)
                : error(req, res, "error la registrar usuario", 500);
            }
          } else {
            error(req, res, "usuario registrado", 409);
          }
        } catch (err) {
          console.error("Error", err);
          error(req, res, "error la procesar datos del usuario", 500);
        }
      }
    );
  }
  // Metodo para obtener usuarios
  public getUser() {
    this.router.get(
      "/users",
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          let listausuario: IDataBlocchain[] =
            await blockChainController.getAll();
          console.log(listausuario);
          res.status(200).send({ message: listausuario });
        } catch (err) {
          res.status(500).send({ message: err });
        }
      }
    );
  }
}
