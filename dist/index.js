"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logs_1 = require("./router/logs");
const movies_1 = require("./router/movies");
const register_1 = require("./router/register");
const login_1 = require("./router/login");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const database_1 = require("./middledware/database");
class Server {
    constructor() {
        // Create Express Application
        this.app = express();
        this.loginRouter = new login_1.LoginRouter();
        this.registerRouter = new register_1.RegisterRotuter();
        this.moviesrouter = new movies_1.Moviesrouter();
        this.logsrouter = new logs_1.Logsrouter();
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
    config() {
        dotenv.config();
        this.app.use(bodyParser.json());
        this.app.use(cors(this.corsOptions));
        database_1.pool
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
    routes() {
        this.app.use(`${this.registerRouter.uri}`, this.registerRouter.router);
        this.app.use(`${this.loginRouter.uri}`, this.loginRouter.router);
        this.app.use(`${this.moviesrouter.uri}`, this.moviesrouter.router);
        this.app.use(`${this.logsrouter.uri}`, this.logsrouter.router);
    }
    /**
     * Open the server in http
     */
    initServer() {
        let server;
        const PORT = process.env.PORT || 3000;
        console.log(PORT);
        server = this.app.listen(PORT, () => {
            console.log(`Server On Port ${PORT}`);
        });
    }
}
// Initialize for server and open
const server = new Server();
server.initServer();
module.exports = server.app;
//# sourceMappingURL=index.js.map