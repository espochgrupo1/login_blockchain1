import { Sequelize, DataTypes } from "sequelize";

export function SchemaMovies(sequealize: Sequelize) {
  return sequealize.define("tbl_movies", {
    mov_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mov_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mov_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
}
