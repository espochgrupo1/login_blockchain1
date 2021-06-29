"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logsrouter = void 0;
const validatetoken_1 = require("./../middledware/validatetoken");
const logs_controller_1 = require("./../controllers/Crud/logs.controller");
const hashblock_1 = require("./../middledware/hashblock");
const movies_controller_1 = require("./../controllers/Crud/movies.controller");
const response_1 = require("./../controllers/Response/response");
const express = require("express");
class Logsrouter {
    constructor() {
        this.router = express.Router();
        this.uri = "/logs";
        this.config();
    }
    config() {
        this.validateLog();
        this.allLogs();
        // End config function
    }
    validateLog() {
        this.router.get("/validate/:id", validatetoken_1.tokenValidate, async (req, res, next) => {
            try {
                if (req.params.id) {
                    const responseMovies = await movies_controller_1.crudMovies.findByid(req.params.id);
                    const responseLogs = await logs_controller_1.crudlogs.filtermoviId(req.params.id);
                    let body = {
                        mov_name: responseMovies.mov_name,
                        mov_link: responseMovies.mov_link,
                        is_valid: responseMovies.is_valid,
                    };
                    if (hashblock_1.hashBlock.hashUser(body) == responseLogs[0].log_hash) {
                        response_1.succes(req, res, "Archivo No Modificado", 200);
                    }
                    else {
                        response_1.error(req, res, "Archivo Modificado", 200);
                    }
                }
                else {
                    response_1.error(req, res, "Ha no se ha enviado id", 400);
                }
            }
            catch (err) {
                response_1.error(req, res, "Ha ocurido un error", 500);
            }
        });
    }
    allLogs() {
        this.router.get("/", validatetoken_1.tokenValidate, async (req, res, next) => {
            try {
                const response = await logs_controller_1.crudlogs.findAll();
                response_1.succes(req, res, response, 200);
            }
            catch (err) {
                response_1.error(req, res, err, 500);
            }
        });
    }
}
exports.Logsrouter = Logsrouter;
//# sourceMappingURL=logs.js.map