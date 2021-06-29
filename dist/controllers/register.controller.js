"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const hashblock_1 = require("./../middledware/hashblock");
const blockchain_controller_1 = require("./blockchain.controller");
class RegisterController {
    constructor() {
        this.hashblock = new hashblock_1.HashBlock();
    }
    hashDataUser(name, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const lista = blockchain_controller_1.blockChainController.getAll();
                if (lista.length > 0) {
                    lista.forEach(async (user) => {
                        if (this.hashblock.hashUser(name) === user.block.nameuser) {
                            reject("Usuario Ya Registrado");
                        }
                        else {
                            this.registerUserInBlock(name, password)
                                .then((data) => {
                                resolve(data);
                            })
                                .catch((err) => {
                                reject(err);
                            });
                        }
                    });
                }
                else {
                    this.registerUserInBlock(name, password)
                        .then((data) => {
                        resolve(data);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            }
            catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }
    registerUserInBlock(user, password) {
        return new Promise(async (resolve, reject) => {
            const registerUser = {
                nameuser: await this.hashblock.hashUser(user),
                password: await await this.hashblock.hashUser(password),
            };
            const statusregister = await blockchain_controller_1.blockChainController.registerUser(registerUser);
            statusregister
                ? resolve("Operacion Realizada")
                : reject("Ha Ocurrido un error la registrar le usuario a el bloque");
        });
    }
}
exports.RegisterController = RegisterController;
//# sourceMappingURL=register.controller.js.map