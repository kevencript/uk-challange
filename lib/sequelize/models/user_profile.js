"use strict";

module.exports = (sequelize, DataTypes) => {
  const user_profile = sequelize.define(
    "user_profile",
    {
      id_user_profile: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: DataTypes.STRING,
      hashed_password: DataTypes.STRING,
    },
    {
      force: false,
      timestamps: false,
      freezeTableName: true,
    }
  );
  user_profile.associate = function (models) {};

  return user_profile;
};
