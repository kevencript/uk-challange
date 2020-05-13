"use strict";

module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define(
    "groups",
    {
      id_group: {
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
  groups.associate = function (models) {};

  return groups;
};
