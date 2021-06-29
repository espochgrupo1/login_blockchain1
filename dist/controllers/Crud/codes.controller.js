"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crudCodeSecuriry = exports.CrudCodesSecuriry = void 0;
const database_1 = require("../../middledware/database");
class CrudCodesSecuriry {
    // Obtener por id
    findByid(id) {
        return new Promise((resolve, reject) => {
            try {
                database_1.schemaCodes
                    .findByPk(id)
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
    // Obtener Todo
    findAll(req, res) {
        return new Promise((resolve, reject) => {
            try {
                database_1.schemaCodes
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
    create(code) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("Datos codigo", code);
                await database_1.schemaCodes
                    .create(code)
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
                database_1.schemaCodes
                    .update(body, {
                    where: { cod_id: id },
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
                database_1.schemaCodes
                    .update(body, {
                    where: { cod_id: id },
                })
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
    // filtro
    findFilter(code) {
        return new Promise((resolve, reject) => {
            try {
                database_1.schemaCodes
                    .findAndCountAll({
                    where: { cod_value: code },
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
exports.CrudCodesSecuriry = CrudCodesSecuriry;
exports.crudCodeSecuriry = new CrudCodesSecuriry();
//# sourceMappingURL=codes.controller.js.map