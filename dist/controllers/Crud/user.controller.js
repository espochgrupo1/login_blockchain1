"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crudUser = exports.CrudUser = void 0;
const database_1 = require("../../middledware/database");
class CrudUser {
    // Obtener por id
    findByid(id) {
        return new Promise((resolve, reject) => {
            try {
                database_1.schemaUsers
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
    findAll(req, res) {
        return new Promise((resolve, reject) => {
            try {
                database_1.schemaUsers
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
    create(usuario) {
        return new Promise(async (resolve, reject) => {
            try {
                await database_1.schemaUsers
                    .create(usuario)
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
                database_1.schemaUsers
                    .update(body, {
                    where: { use_id: id },
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
                database_1.schemaUsers
                    .update(body, {
                    where: { use_id: id },
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
exports.CrudUser = CrudUser;
exports.crudUser = new CrudUser();
//# sourceMappingURL=user.controller.js.map