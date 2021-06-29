"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crudlogs = exports.CrudLogs = void 0;
const database_1 = require("../../middledware/database");
class CrudLogs {
    // Obtener por id
    findByid(id) {
        return new Promise((resolve, reject) => {
            try {
                database_1.schemaLogs
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
                database_1.schemaLogs
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
    create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                await database_1.schemaLogs
                    .create(body)
                    .then((data) => {
                    resolve(data.get({ plain: true }));
                })
                    .catch((err) => {
                    console.error("Error al crear", err);
                    reject(err);
                });
            }
            catch (error) {
                console.error("Error al crear", error);
                reject(error);
            }
        });
    }
    // Actualizar
    update(body, id) {
        return new Promise((resolve, reject) => {
            try {
                database_1.schemaLogs
                    .update(body, {
                    where: { log_id: id },
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
                database_1.schemaLogs
                    .update(body, {
                    where: { log_id: id },
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
    filtermoviId(id) {
        return new Promise((resolve, reject) => {
            try {
                database_1.schemaLogs
                    .findAll({
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
exports.CrudLogs = CrudLogs;
exports.crudlogs = new CrudLogs();
//# sourceMappingURL=logs.controller.js.map