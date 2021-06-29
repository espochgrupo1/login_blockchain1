import { IDataBlocchain } from "src/interfaces/block.interface";
import { IUser } from "../../interfaces/user.interface";
import { HashBlock } from "../../middledware/hashblock";
import { blockChainController } from "../Blockchain/blockchain.controller";
import { v4 as uuidv4 } from "uuid";
export class RegisterController {
  hashblock: HashBlock;
  constructor() {
    this.hashblock = new HashBlock();
  }

  public registerUserInBlock(user: string, password: string, id: number) {
    return new Promise(async (resolve, reject) => {
      const registerUser: IUser = {
        nameuser: await this.hashblock.hashUser(user),
        wallet: await await this.hashblock.hashUser(password),
        use_id: id,
        key: uuidv4(),
      };
      const statusregister = await blockChainController.registerUser(
        registerUser
      );
      statusregister ? resolve(true) : reject(false);
    });
  }
}

export const registerController = new RegisterController();
