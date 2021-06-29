"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonWebtoken = void 0;
const jwt = require("jsonwebtoken");
class JsonWebtoken {
    constructor() { }
    sign(data) {
        let secretKey = "Palabra Secreta";
        return jwt.sign({
            user: data,
        }, secretKey, {
            expiresIn: 24 * 60 * 60,
        });
    }
    verify(token) {
        let secretKey = process.env.SECRET;
        try {
            return jwt.verify(token, secretKey);
        }
        catch (error) {
            return "Token_not_valid";
            console.log(error);
        }
    }
}
exports.JsonWebtoken = JsonWebtoken;
//# sourceMappingURL=jwt.js.map