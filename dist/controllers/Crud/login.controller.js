"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.LoginController = void 0;
const blockchain_controller_1 = require("../Blockchain/blockchain.controller");
const hashblock_1 = require("../../middledware/hashblock");
const register_controller_1 = require("./register.controller");
class LoginController {
    constructor() {
        this.registerController = new register_controller_1.RegisterController();
        this.hashblock = new hashblock_1.HashBlock();
    }
    async verifiLogin(usuario) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("Verificando Login");
                const lista = blockchain_controller_1.blockChainController.getAll();
                const findUser = lista.find(async (e) => {
                    e.block.nameuser ===
                        (await this.hashblock.hashUser(usuario.nameuser));
                });
                console.log(findUser);
                if (findUser === undefined) {
                    reject("Usuario o contraseña incorrecta");
                }
                else if (this.hashblock.hashUser(usuario.wallet) == findUser.block.wallet) {
                    resolve(findUser);
                }
                else {
                    reject("Usuario o contraseña incorrecta 1");
                }
            }
            catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }
}
exports.LoginController = LoginController;
exports.loginController = new LoginController();
//# sourceMappingURL=login.controller.js.map