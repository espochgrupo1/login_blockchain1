"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRotuter = void 0;
const response_1 = require("../controllers/Response/response");
const express = require("express");
const blockchain_controller_1 = require("../controllers/Blockchain/blockchain.controller");
const register_controller_1 = require("../controllers/Crud/register.controller");
const user_controller_1 = require("../controllers/Crud/user.controller");
class RegisterRotuter {
    constructor() {
        this.router = express.Router();
        this.uri = "/register";
        this.config();
    }
    config() {
        this.register();
        this.getUser();
        // End config function
    }
    // Metodo para registrar un usuario
    register() {
        this.router.post("/", async (req, res, next) => {
            try {
                const finduser = await blockchain_controller_1.blockChainController.findUser(req.body.use_email);
                console.log("Buscando Usuario en blockchain", finduser);
                if (finduser === undefined) {
                    const user = {
                        use_name: req.body.use_name,
                        use_lastname: req.body.use_lastname,
                        use_phone: req.body.use_phone,
                        use_email: req.body.use_email,
                        is_valid: true,
                    };
                    const responseUser = await user_controller_1.crudUser.create(user);
                    if (!responseUser.use_id) {
                        response_1.error(req, res, "Ha ocurrido un error", 500);
                    }
                    else {
                        const responseblockchain = await register_controller_1.registerController.registerUserInBlock(req.body.use_email, req.body.wallet, responseUser.use_id);
                        responseblockchain
                            ? response_1.succes(req, res, "Usuario Registrado", 201)
                            : response_1.error(req, res, "error la registrar usuario", 500);
                    }
                }
                else {
                    response_1.error(req, res, "usuario registrado", 409);
                }
            }
            catch (err) {
                console.error("Error", err);
                response_1.error(req, res, "error la procesar datos del usuario", 500);
            }
        });
    }
    // Metodo para obtener usuarios
    getUser() {
        this.router.get("/users", async (req, res, next) => {
            try {
                let listausuario = await blockchain_controller_1.blockChainController.getAll();
                console.log(listausuario);
                res.status(200).send({ message: listausuario });
            }
            catch (err) {
                res.status(500).send({ message: err });
            }
        });
    }
}
exports.RegisterRotuter = RegisterRotuter;
//# sourceMappingURL=register.js.map