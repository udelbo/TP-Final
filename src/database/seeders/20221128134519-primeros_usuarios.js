'use strict';

const models = require('../models/index')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      models.usuario.findOrCreate({
        where: {
          id: "1"
        },
        defaults: {
          nombre: "Roberto2",
          apellido: "Carlos2",
          edad: 34,
          email: "robertocarlos@gmail.com"
        }
      }),

      models.usuario.findOrCreate({
        where: {
          id: "2"
        },
        defaults: {
          nombre: "Juana2",
          apellido: "Irene2",
          edad: 44,
          email: "juanairene@hotmail.com"
        }
      }),

      models.usuario.findOrCreate({
        where: {
          id: "3"
        },
        defaults: {
          nombre: "Rick",
          apellido: "Sosa",
          edad: 56,
          email: "rd@hotmail.com"
        }
      }),
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
