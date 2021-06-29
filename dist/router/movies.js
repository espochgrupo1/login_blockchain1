"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Moviesrouter = void 0;
const hashblock_1 = require("./../middledware/hashblock");
const movies_controller_1 = require("./../controllers/Crud/movies.controller");
const response_1 = require("./../controllers/Response/response");
const express = require("express");
const validatetoken_1 = require("../middledware/validatetoken");
const logs_controller_1 = require("../controllers/Crud/logs.controller");
class Moviesrouter {
    constructor() {
        this.router = express.Router();
        this.uri = "/movies";
        this.config();
    }
    config() {
        this.getMovies();
        this.createMovie();
        // End config function
    }
    getMovies() {
        this.router.get("/", validatetoken_1.tokenValidate, async (req, res, next) => {
            try {
                const responseMovies = await movies_controller_1.crudMovies.findAll();
                responseMovies
                    ? response_1.succes(req, res, responseMovies, 200)
                    : response_1.error(req, res, "Error listando Enlaces", 500);
            }
            catch (err) {
                response_1.error(req, res, "Ha ocurido un error", 500);
            }
        });
    }
    createMovie() {
        this.router.post("/", validatetoken_1.tokenValidate, async (req, res, next) => {
            try {
                const responseMovies = await movies_controller_1.crudMovies.create(req.body);
                if (responseMovies.mov_id) {
                    console.log("Dato para hash", req.body);
                    const body = {
                        log_name: req.body.mov_name,
                        mov_id: responseMovies.mov_id,
                        is_valid: true,
                        log_hash: hashblock_1.hashBlock.hashUser(req.body),
                    };
                    const responseLogs = await logs_controller_1.crudlogs.create(body);
                    responseLogs.log_id
                        ? response_1.succes(req, res, "Enlace creada correctamente", 200)
                        : response_1.error(req, res, "Error al crear log de Enlace", 500);
                }
                else {
                    response_1.error(req, res, "Error al crear Enlace", 500);
                }
            }
            catch (err) {
                response_1.error(req, res, "Ha ocurido un error", 200);
            }
        });
    }
}
exports.Moviesrouter = Moviesrouter;
//# sourceMappingURL=movies.js.map