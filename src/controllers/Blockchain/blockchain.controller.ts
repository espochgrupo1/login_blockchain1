import { IDataBlocchain } from "../../interfaces/block.interface";
import { hashBlock, HashBlock } from "../../middledware/hashblock";
import { IUser } from "../../interfaces/user.interface";
class BlockChainController {
  public listUser: IDataBlocchain[];
  private hashbloc: HashBlock;
  constructor() {
    this.hashbloc = new HashBlock();
    this.listUser = [];
  }

  public findUser(user: string) {
    return new Promise((resolve, reject) => {
      try {
        const userfind = this.listUser.find(
          (e) => e.block.nameuser == hashBlock.hashUser(user)
        );
        console.log(userfind);
        resolve(userfind);
      } catch (err) {
        reject(err); 
      }
    });
  }

  public registerUser(user: Partial<IUser>) {
    return new Promise((resolve, reject) => {
      try {
        this.listUser.push({
          block: user,
          hash: this.hashbloc.hashUser(user),
        });
        resolve(this.listUser);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  public getAll() {
    return this.listUser;
  }
}

export const blockChainController = new BlockChainController();
