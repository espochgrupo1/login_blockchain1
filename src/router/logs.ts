import { tokenValidate } from "./../middledware/validatetoken";
import { crudlogs } from "./../controllers/Crud/logs.controller";
import { hashBlock } from "./../middledware/hashblock";
import { crudMovies } from "./../controllers/Crud/movies.controller";
import { error, succes } from "./../controllers/Response/response";
import * as express from "express";
import { IMovies, IResponseMovies } from "src/interfaces/movies.interface";
export class Logsrouter {
  public router: express.Router;
  public uri: string;
  constructor() {
    this.router = express.Router();
    this.uri = "/logs";
    this.config();
  }

  public config(): void {
    this.validateLog();
    this.allLogs();
    // End config function
  }

  public validateLog() {
    this.router.get(
      "/validate/:id",
      tokenValidate,
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          if (req.params.id) {
            const responseMovies: IMovies = await crudMovies.findByid(
              req.params.id
            );
            const responseLogs = await crudlogs.filtermoviId(req.params.id);
            let body: Partial<IMovies> = {
              mov_name: responseMovies.mov_name,
              mov_link: responseMovies.mov_link,
              is_valid: responseMovies.is_valid,
            };
            if (hashBlock.hashUser(body) == responseLogs[0].log_hash) {
              succes(req, res, "Archivo No Modificado", 200);
            } else {
              error(req, res, "Archivo Modificado", 200);
            }
          } else {
            error(req, res, "Ha no se ha enviado id", 400);
          }
        } catch (err) {
          error(req, res, "Ha ocurido un error", 500);
        }
      }
    );
  }

  public allLogs() {
    this.router.get(
      "/",
      tokenValidate,
      async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        try {
          const response = await crudlogs.findAll();
          succes(req, res, response, 200);
        } catch (err) {
          error(req, res, err, 500);
        }
      }
    );
  }
}
