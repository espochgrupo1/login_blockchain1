import { Request, Response } from "express";
import { IResponseCrudUser, IUser } from "src/interfaces/user.interface";
import { schemaUsers } from "../../middledware/database";
export class CrudUser {
  // Obtener por id
  public findByid(id) {
    return new Promise((resolve, reject) => {
      try {
        schemaUsers
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
  public findAll(req: Request, res: Response) {
    return new Promise((resolve, reject) => {
      try {
        schemaUsers
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

  public create(usuario: any) {
    return new Promise<IUser>(async (resolve, reject) => {
      try {
        await schemaUsers
          .create(usuario)
          .then((data: any) => {
            resolve(data.get({ plain: true }));
          })
          .catch((err) => {
            console.error("Error al crear usuario", err);
            reject(err);
          });
      } catch (error) {
        console.error("Error al crear usuario", error);
        reject(error);
      }
    });
  }
  // Actualizar
  public update(body: any, id: number) {
    return new Promise((resolve, reject) => {
      try {
        schemaUsers
          .update(body, {
            where: { use_id: id },
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
        schemaUsers
          .update(body, {
            where: { use_id: id },
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
}

export const crudUser = new CrudUser();
