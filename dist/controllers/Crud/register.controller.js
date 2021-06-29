"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = exports.RegisterController = void 0;
const hashblock_1 = require("../../middledware/hashblock");
const blockchain_controller_1 = require("../Blockchain/blockchain.controller");
const uuid_1 = require("uuid");
class RegisterController {
    constructor() {
        this.hashblock = new hashblock_1.HashBlock();
    }
    registerUserInBlock(user, password, id) {
        return new Promise(async (resolve, reject) => {
            const registerUser = {
                nameuser: await this.hashblock.hashUser(user),
                wallet: await await this.hashblock.hashUser(password),
                use_id: id,
                key: uuid_1.v4(),
            };
            const statusregister = await blockchain_controller_1.blockChainController.registerUser(registerUser);
            statusregister ? resolve(true) : reject(false);
        });
    }
}
exports.RegisterController = RegisterController;
exports.registerController = new RegisterController();
//# sourceMappingURL=register.controller.js.map