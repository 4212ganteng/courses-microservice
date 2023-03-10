"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "John Doe",
        profession: "Backend Developer",
        role: "admin",
        email: "jhondoe@gmail.com",
        password: await bcrypt.hash("backend123", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "John thor",
        profession: "Frontend Developer",
        role: "student",
        email: "jhonthor@mail.com",
        password: await bcrypt.hash("frontend123", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
