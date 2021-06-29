import { Sequelize, DataTypes } from "sequelize";

export function SchemaLogs(sequealize: Sequelize) {
  return sequealize.define("tbl_logs", {
    log_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    log_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mov_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    log_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
}
