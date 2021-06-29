"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockChainController = void 0;
const hashblock_1 = require("../../middledware/hashblock");
class BlockChainController {
    constructor() {
        this.hashbloc = new hashblock_1.HashBlock();
        this.listUser = [];
    }
    findUser(user) {
        return new Promise((resolve, reject) => {
            try {
                const userfind = this.listUser.find((e) => e.block.nameuser == hashblock_1.hashBlock.hashUser(user));
                console.log(userfind);
                resolve(userfind);
            }
            catch (err) {
                reject(err);
            }
        });
    }
    registerUser(user) {
        return new Promise((resolve, reject) => {
            try {
                this.listUser.push({
                    block: user,
                    hash: this.hashbloc.hashUser(user),
                });
                resolve(this.listUser);
            }
            catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }
    getAll() {
        return this.listUser;
    }
}
exports.blockChainController = new BlockChainController();
//# sourceMappingURL=blockchain.controller.js.map