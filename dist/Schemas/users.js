"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shemaUsers = void 0;
const sequelize_1 = require("sequelize");
function shemaUsers(sequealize) {
    return sequealize.define("tbl_users", {
        use_id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        use_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        use_lastname: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        use_email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        use_phone: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        is_valid: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
}
exports.shemaUsers = shemaUsers;
//# sourceMappingURL=users.js.map