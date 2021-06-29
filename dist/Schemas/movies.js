"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaMovies = void 0;
const sequelize_1 = require("sequelize");
function SchemaMovies(sequealize) {
    return sequealize.define("tbl_movies", {
        mov_id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        mov_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        mov_link: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        is_valid: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
}
exports.SchemaMovies = SchemaMovies;
//# sourceMappingURL=movies.js.map