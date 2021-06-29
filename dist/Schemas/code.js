"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaCodes = void 0;
const sequelize_1 = require("sequelize");
function SchemaCodes(sequealize) {
    return sequealize.define("tbl_code_security", {
        cod_id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cod_value: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        is_valid: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
}
exports.SchemaCodes = SchemaCodes;
//# sourceMappingURL=code.js.map