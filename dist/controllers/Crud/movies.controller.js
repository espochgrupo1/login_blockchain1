"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crudMovies = exports.CrudMovies = void 0;
const database_1 = require("../../middledware/database");
class CrudMovies {
    // Obtener por id
    findByid(id) {
        return new Promise((resolve, reject) => {
            try {
                database_1.schemaMovies
                    .findByPk(id)
                    .then((data) => {
                    resolve(data.get({ plain: true }));
                })
                    .catch((err) => {
                    reject(err);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    // Obtener Todo
    findAll() {
        return new Promise((resolve, reject) => {
            try {
                database_1.schemaMovies
                    .findAndCountAll()
                    .then((data) => {
                    resolve(data);
                })
                    .catch((err) => {
                    reject(err);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    // Crear
    create(movie) {
        return new Promise(async (resolve, reject) => {
            try {
                await database_1.schemaMovies
                    .create(movie)
                    .then((data) => {
                    resolve(data.get({ plain: true }));
                })
                    .catch((err) => {
                    console.error("Error al crear usuario", err);
                    reject(err);
                });
            }
            catch (error) {
                console.error("Error al crear usuario", error);
                reject(error);
            }
        });
    }
    // Actualizar
    update(body, id) {
        return new Promise((resolve, reject) => {
            try {
                database_1.schemaMovies
                    .update(body, {
                    where: { mov_id: id },
                })
                    .then((data) => {
                    resolve(data);
                })
                    .catch((err) => {
                    reject(err);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    // Eliminar
    delete(body, id) {
        return new Promise((resolve, reject) => {
            try {
                database_1.schemaMovies
                    .update(body, {
                    where: { mov_id: id },
                })
                    .then((data) => {
                    resolve(data);
                })
                    .catch((err) => {
                    reject(err);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.CrudMovies = CrudMovies;
exports.crudMovies = new CrudMovies();
//# sourceMappingURL=movies.controller.js.map