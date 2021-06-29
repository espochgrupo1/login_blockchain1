import * as sequelize from "sequelize";
import { shemaUsers } from "../Schemas/users";
import { SchemaCodes } from "../Schemas/code";
import config from "../config/config";
import { SchemaLogs } from "../Schemas/logs";
import { SchemaMovies } from "../Schemas/movies";
require("dotenv").config();
export const pool = new sequelize.Sequelize(
  config.database,
  config.userdatabase,
  config.passworddatabase,
  {
    port: 3306,
    host: config.hostdatabase,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export const schemaUsers = shemaUsers(pool);
export const schemaCodes = SchemaCodes(pool);
export const schemaLogs = SchemaLogs(pool);
export const schemaMovies = SchemaMovies(pool);

schemaCodes.belongsTo(schemaUsers, {
  foreignKey: "use_id",
});
