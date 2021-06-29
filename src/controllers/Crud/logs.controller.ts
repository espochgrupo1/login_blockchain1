import { Request, Response } from "express";
import { ILogs } from "src/interfaces/logs.interface";
import { IResponseCrudUser, IUser } from "src/interfaces/user.interface";
import { schemaLogs } from "../../middledware/database";
export class CrudLogs {
  // Obtener por id
  public findByid(id) {
    return new Promise((resolve, reject) => {
      try {
        schemaLogs
          .findByPk(id)
          .then((data) => {
            resolve(data.get({ plain: true }));
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  // Obtener Todo
  public findAll() {
    return new Promise((resolve, reject) => {
      try {
        schemaLogs
          .findAndCountAll()
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  // Crear

  public create(body: any) {
    return new Promise<ILogs>(async (resolve, reject) => {
      try {
        await schemaLogs
          .create(body)
          .then((data: any) => {
            resolve(data.get({ plain: true }));
          })
          .catch((err) => {
            console.error("Error al crear", err);
            reject(err);
          });
      } catch (error) {
        console.error("Error al crear", error);
        reject(error);
      }
    });
  }
  // Actualizar
  public update(body: any, id: number) {
    return new Promise((resolve, reject) => {
      try {
        schemaLogs
          .update(body, {
            where: { log_id: id },
          })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
  // Eliminar
  public delete(body: any, id) {
    return new Promise((resolve, reject) => {
      try {
        schemaLogs
          .update(body, {
            where: { log_id: id },
          })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  public filtermoviId(id) {
    return new Promise((resolve, reject) => {
      try {
        schemaLogs
          .findAll({
            where: { mov_id: id },
          })
          .then((data: any) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const crudlogs = new CrudLogs();
