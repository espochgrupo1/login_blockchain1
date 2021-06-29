"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRouter = void 0;
const response_1 = require("./../controllers/Response/response");
const email_controller_1 = require("./../controllers/Email/email.controller");
const user_controller_1 = require("../controllers/Crud/user.controller");
const login_controller_1 = require("../controllers/Crud/login.controller");
const express = require("express");
const jwt_1 = require("../middledware/jwt");
const uuid_1 = require("uuid");
const codes_controller_1 = require("../controllers/Crud/codes.controller");
const blockchain_controller_1 = require("../controllers/Blockchain/blockchain.controller");
class LoginRouter {
    constructor() {
        this.router = express.Router();
        this.uri = "/login";
        this.jsonWebtoken = new jwt_1.JsonWebtoken();
        this.config();
    }
    config() {
        this.signIn();
        this.logOut();
        this.validateCode();
        // End config function
    }
    signIn() {
        this.router.post("/signin", async (req, res, next) => {
            try {
                console.log(req.body);
                const validateuser = await login_controller_1.loginController.verifiLogin(req.body);
                if (validateuser) {
                    const user = await user_controller_1.crudUser.findByid(validateuser.block.use_id);
                    const code = uuid_1.v4().slice(0, 6);
                    const bodycode = {
                        use_id: validateuser.block.use_id,
                        cod_value: code,
                        is_valid: true,
                    };
                    const responseCode = await codes_controller_1.crudCodeSecuriry.create(bodycode);
                    if (responseCode.cod_id) {
                        const responseemail = await email_controller_1.emailController.emailBasic(user.use_email, code);
                        responseemail
                            ? response_1.succes(req, res, "Correo enviado correctamente", 200)
                            : response_1.error(req, res, "Error al enviar correo", 500);
                    }
                    else {
                        response_1.error(req, res, "Ha ocurrido un error", 500);
                    }
                }
                else {
                    response_1.error(req, res, "Datos Incorrectos", 422);
                }
            }
            catch (err) {
                console.log(err);
                response_1.error(req, res, "Ha ocurrido un error", 500);
            }
        });
    }
    validateCode() {
        this.router.get("/validate/:id", async (req, res, next) => {
            try {
                if (req.params.id) {
                    const response = await codes_controller_1.crudCodeSecuriry.findFilter(req.params.id);
                    if (response.rows[0].is_valid) {
                        const user = await user_controller_1.crudUser.findByid(response.rows[0].use_id);
                        const userfind = await blockchain_controller_1.blockChainController.findUser(user.use_email);
                        if (userfind) {
                            const datosUser = {
                                name: user.use_name,
                                valido: user.is_valid,
                                iduse: user.use_id,
                            };
                            const token = await this.jsonWebtoken.sign(datosUser);
                            response_1.succes(req, res, token, 200);
                            codes_controller_1.crudCodeSecuriry.update({ is_valid: false }, response.rows[0].cod_id);
                        }
                        else {
                            response_1.error(req, res, "Codigo invalido", 200);
                        }
                    }
                    else {
                        response_1.error(req, res, "Codigo invalido", 200);
                    }
                }
                else {
                    response_1.error(req, res, "No hay codigo para validar", 400);
                }
            }
            catch (err) {
                console.error(err);
                response_1.error(req, res, "ha ocurrido un error", 500);
            }
        });
    }
    logOut() {
        this.router.get("/logout", async (req, res, next) => {
            try {
                res.status(200).send({ message: "done" });
            }
            catch (err) {
                console.log("Error - activate Deactivate Microphone - ", err);
                next(err);
            }
        });
    }
}
exports.LoginRouter = LoginRouter;
//# sourceMappingURL=login.js.map