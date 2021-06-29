"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const config = {
    port: process.env.PORT,
    hostdatabase: process.env.HOSTDATABASE,
    database: process.env.DATABASE,
    userdatabase: process.env.USERDATABASE,
    passworddatabase: process.env.PASSSWORDDATABASE,
    userEmail: process.env.USER_EMAIL,
    passwordEmail: process.env.PASSWORD_EMAIL,
};
exports.default = config;
//# sourceMappingURL=config.js.map