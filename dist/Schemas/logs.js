"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaLogs = void 0;
const sequelize_1 = require("sequelize");
function SchemaLogs(sequealize) {
    return sequealize.define("tbl_logs", {
        log_id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        log_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        mov_id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        log_hash: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        is_valid: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
}
exports.SchemaLogs = SchemaLogs;
//# sourceMappingURL=logs.js.map