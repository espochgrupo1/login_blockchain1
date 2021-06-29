import { blockChainController } from "../Blockchain/blockchain.controller";
import { HashBlock } from "../../middledware/hashblock";
import { IUser } from "../../interfaces/user.interface";
import { IDataBlocchain } from "src/interfaces/block.interface";
import { RegisterController } from "./register.controller";

export class LoginController {
  private registerController: RegisterController;
  private hashblock: HashBlock;
  constructor() {
    this.registerController = new RegisterController();
    this.hashblock = new HashBlock();
  }

  async verifiLogin(usuario: IUser) {
    return new Promise<IDataBlocchain>(async (resolve, reject) => {
      try {
        console.log("Verificando Login");
        const lista: IDataBlocchain[] = blockChainController.getAll();
        const findUser = lista.find(async (e) => {
          e.block.nameuser ===
            (await this.hashblock.hashUser(usuario.nameuser));
        });
        console.log(findUser);
        if (findUser === undefined) {
          reject("Usuario o contraseña incorrecta");
        } else if (
          this.hashblock.hashUser(usuario.wallet) == findUser.block.wallet
        ) {
          resolve(findUser);
        } else {
          reject("Usuario o contraseña incorrecta 1");
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }
}

export const loginController = new LoginController();
