"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserting Example User
    await queryInterface.bulkInsert(
      "user_profile",
      [
        {
          email: "user@example",
          hashed_password:
            "$2a$10$VyEgSdjJlNQ751wbqS9ut.GLJs1tW2ckj8y/l557a9/LMOSXk5JD6",
        },
      ],
      {}
    );

    // Inserting Group 1
    await queryInterface.bulkInsert(
      "groups",
      [
        {
          id_group: 1,
          name: "Group 1",
        },
      ],
      {}
    );

    // Inserting Group 2
    await queryInterface.bulkInsert(
      "groups",
      [
        {
          id_group: 2,
          name: "Group 2",
        },
      ],
      {}
    );

    // Item
    await queryInterface.bulkInsert(
      "items",
      [
        {
          id_item: 1,
          name: "Main Item",
        },
      ],
      {}
    );

    // Inserting user Current Group 1
    await queryInterface.bulkInsert(
      "item_current_groups",
      [
        {
          id_user_profile: 1,
          id_group: 1,
        },
      ],
      {}
    );

    // Inserting user Current Group 2
    await queryInterface.bulkInsert(
      "item_current_groups",
      [
        {
          id_user_profile: 1,
          id_group: 2,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user_profile", null, {});
  },
};
