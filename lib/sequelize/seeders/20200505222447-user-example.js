"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
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
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user_profile", null, {});
  },
};
