"use strict";

module.exports = (sequelize, DataTypes) => {
  const item_current_groups = sequelize.define(
    "item_current_groups",
    {
      id_item_current_group: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user_profile: {
        type: DataTypes.INTEGER,
        references: {
          model: "user_profile",
          key: "id_user_profile",
        },
      },
      id_group: {
        type: DataTypes.INTEGER,
        references: {
          model: "groups",
          key: "id_group",
        },
      },
    },
    {
      force: false,
      timestamps: false,
      freezeTableName: true,
    }
  );
  item_current_groups.associate = function (models) {
    // Group Relationship
    item_current_groups.hasMany(models.groups, {
      foreignKey: "id_group",
    });

    // User Relationship
    item_current_groups.hasMany(models.user_profile, {
      foreignKey: "id_user_profile",
    });
  };

  return item_current_groups;
};
