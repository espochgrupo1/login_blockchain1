import { Logsrouter } from "./router/logs";
import { Moviesrouter } from "./router/movies";
import { RegisterRotuter } from "./router/register";
import { LoginRouter } from "./router/login";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { pool } from "./middledware/database";

class Server {
  public app: express.Application;
  private corsOptions: Object;
  private loginRouter: LoginRouter;
  private registerRouter: RegisterRotuter;
  private moviesrouter: Moviesrouter;
  private logsrouter: Logsrouter;

  constructor() {
    // Create Express Application
    this.app = express();
    this.loginRouter = new LoginRouter();
    this.registerRouter = new RegisterRotuter();
    this.moviesrouter = new Moviesrouter();
    this.logsrouter = new Logsrouter();
    // Configure Application
    this.config();
    // Core Options
    this.corsOptions = {
      methods: ["POST", "GET"],
      origin: true,
    };
    // Method for Activate Routes
    this.routes();
  }
  /**
   * Configure my app
   */

  private config(): void {
    dotenv.config();
    this.app.use(bodyParser.json());
    this.app.use(cors(this.corsOptions));
    pool
      .sync({ force: false })
      .then(() => {
        console.log("Database sync");
      })
      .catch((err) => {
        console.log(process.env.HOST);
        console.log("Not sync Database");
        console.log(err);
      });
  }
  routes(): void {
    this.app.use(`${this.registerRouter.uri}`, this.registerRouter.router);
    this.app.use(`${this.loginRouter.uri}`, this.loginRouter.router);
    this.app.use(`${this.moviesrouter.uri}`, this.moviesrouter.router);
    this.app.use(`${this.logsrouter.uri}`, this.logsrouter.router);
  }

  /**
   * Open the server in http
   */
  public initServer() {
    let server: any;
    const PORT = process.env.PORT || 3000;
    console.log(PORT);
    server = this.app.listen(PORT, () => {
      console.log(`Server On Port ${PORT}`);
    });
  }

  // End Open Function
}
// Initialize for server and open
const server = new Server();
server.initServer();
module.exports = server.app;
