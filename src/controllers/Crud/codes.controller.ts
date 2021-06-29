import { Request, Response } from "express";
import { ICodeSecurity } from "src/interfaces/code";
import { IResponseCrudUser, IUser } from "src/interfaces/user.interface";
import { schemaCodes } from "../../middledware/database";
export class CrudCodesSecuriry {
  // Obtener por id
  public findByid(id) {
    return new Promise((resolve, reject) => {
      try {
        schemaCodes
          .findByPk(id)
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
  // Obtener Todo
  public findAll(req: Request, res: Response) {
    return new Promise((resolve, reject) => {
      try {
        schemaCodes
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

  public create(code: any) {
    return new Promise<ICodeSecurity>(async (resolve, reject) => {
      try {
        console.log("Datos codigo", code);
        await schemaCodes
          .create(code)
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
        schemaCodes
          .update(body, {
            where: { cod_id: id },
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
        schemaCodes
          .update(body, {
            where: { cod_id: id },
          })
          .then((data: any) => {
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
  // filtro
  public findFilter(code) {
    return new Promise((resolve, reject) => {
      try {
        schemaCodes
          .findAndCountAll({
            where: { cod_value: code },
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

export const crudCodeSecuriry = new CrudCodesSecuriry();
