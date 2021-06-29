"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashBlock = exports.HashBlock = void 0;
const crypto_js_1 = require("crypto-js");
class HashBlock {
    constructor() { }
    hashUser(data) {
        return crypto_js_1.SHA256(JSON.stringify(data)).toString();
    }
    validarHash(datobloque, datouser) {
        if (this.hashUser(datobloque) != this.hashUser(datouser)) {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.HashBlock = HashBlock;
exports.hashBlock = new HashBlock();
//# sourceMappingURL=hashblock.js.map