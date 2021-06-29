import { SHA256 } from "crypto-js";
export class HashBlock {
  constructor() {}

  public hashUser(data: any) {
    return SHA256(JSON.stringify(data)).toString();
  }

  public validarHash(datobloque: any, datouser: any) {
    if (this.hashUser(datobloque) != this.hashUser(datouser)) {
      return false;
    } else {
      return true;
    }
  }
}

export const hashBlock = new HashBlock();
