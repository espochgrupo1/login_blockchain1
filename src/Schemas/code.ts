import { Sequelize, DataTypes } from "sequelize";

export function SchemaCodes(sequealize: Sequelize) {
  return sequealize.define("tbl_code_security", {
    cod_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cod_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
}
