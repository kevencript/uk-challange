"use strict";

const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define(
    "items",
    {
      id_item: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      force: false,
      timestamps: false,
      freezeTableName: true,
    }
  );
  items.associate = function (models) {};

  sequelizePaginate.paginate(items);
  return items;
};
