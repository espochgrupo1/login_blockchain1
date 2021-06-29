import { IMovies } from "../../interfaces/movies.interface";
import { IResponseCrudUser, IUser } from "../../interfaces/user.interface";
import { schemaMovies } from "../../middledware/database";
export class CrudMovies {
  // Obtener por id
  public findByid(id) {
    return new Promise<IMovies>((resolve, reject) => {
      try {
        schemaMovies
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
        schemaMovies
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

  public create(movie: any) {
    return new Promise<IMovies>(async (resolve, reject) => {
      try {
        await schemaMovies
          .create(movie)
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
        schemaMovies
          .update(body, {
            where: { mov_id: id },
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
        schemaMovies
          .update(body, {
            where: { mov_id: id },
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

export const crudMovies = new CrudMovies();
