import { hashBlock } from "./../middledware/hashblock";
import { crudMovies } from "./../controllers/Crud/movies.controller";
import { error, succes } from "./../controllers/Response/response";
import * as express from "express";
import { tokenValidate } from "../middledware/validatetoken";
import { crudlogs } from "../controllers/Crud/logs.controller";
import { IMovies } from "../interfaces/movies.interface";
import { HashBlock } from "../middledware/hashblock";
import { ILogs } from "src/interfaces/logs.interface";
export class Moviesrouter {
  public router: express.Router;
  public uri: string;
  private movies: any[];
  constructor() {
    this.router = express.Router();
    this.uri = "/movies";
    this.config();
  }

  public config(): void {
    this.getMovies();
    this.createMovie();
    // End config function
  }

  public getMovies() {
    this.router.get(
      "/",
      tokenValidate,
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          const responseMovies = await crudMovies.findAll();
          responseMovies
            ? succes(req, res, responseMovies, 200)
            : error(req, res, "Error listando Enlaces", 500);
        } catch (err) {
          error(req, res, "Ha ocurido un error", 500);
        }
      }
    );
  }

  public createMovie() {
    this.router.post(
      "/",
      tokenValidate,
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          const responseMovies: IMovies = await crudMovies.create(req.body);
          if (responseMovies.mov_id) {
            console.log("Dato para hash", req.body);
            const body: Partial<ILogs> = {
              log_name: req.body.mov_name,
              mov_id: responseMovies.mov_id,
              is_valid: true,
              log_hash: hashBlock.hashUser(req.body),
            };
            const responseLogs: ILogs = await crudlogs.create(body);
            responseLogs.log_id
              ? succes(req, res, "Enlace creada correctamente", 200)
              : error(req, res, "Error al crear log de Enlace", 500);
          } else {
            error(req, res, "Error al crear Enlace", 500);
          }
        } catch (err) {
          error(req, res, "Ha ocurido un error", 200);
        }
      }
    );
  }
}
