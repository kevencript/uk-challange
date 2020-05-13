"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // User Profile Model
    await queryInterface.createTable("user_profile", {
      id_user_profile: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      hashed_password: Sequelize.STRING,
    });

    //  Items
    await queryInterface.createTable("items", {
      id_item: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    });

    //  Groups
    await queryInterface.createTable(
      "groups",
      {
        id_group: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: Sequelize.STRING,
      },
      {
        force: false,
        timestamps: false,
        freezeTableName: true,
      }
    );

    // Item Current Groups
    await queryInterface.createTable("item_current_groups", {
      id_item_current_group: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user_profile: {
        type: Sequelize.INTEGER,

        references: {
          model: "user_profile",
          key: "id_user_profile",
        },
      },
      id_group: {
        type: Sequelize.INTEGER,
        references: {
          model: "groups",
          key: "id_group",
        },
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("user_profile");
  },
};
