"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaMovies = exports.schemaLogs = exports.schemaCodes = exports.schemaUsers = exports.pool = void 0;
const sequelize = require("sequelize");
const users_1 = require("../Schemas/users");
const code_1 = require("../Schemas/code");
const config_1 = require("../config/config");
const logs_1 = require("../Schemas/logs");
const movies_1 = require("../Schemas/movies");
require("dotenv").config();
exports.pool = new sequelize.Sequelize(config_1.default.database, config_1.default.userdatabase, config_1.default.passworddatabase, {
    port: 3306,
    host: config_1.default.hostdatabase,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
exports.schemaUsers = users_1.shemaUsers(exports.pool);
exports.schemaCodes = code_1.SchemaCodes(exports.pool);
exports.schemaLogs = logs_1.SchemaLogs(exports.pool);
exports.schemaMovies = movies_1.SchemaMovies(exports.pool);
exports.schemaCodes.belongsTo(exports.schemaUsers, {
    foreignKey: "use_id",
});
//# sourceMappingURL=database.js.map