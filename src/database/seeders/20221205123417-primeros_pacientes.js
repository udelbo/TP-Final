'use strict';

const models = require('../models/index')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      models.paciente.findOrCreate({
        where: {
          id: "1"
        },
        defaults: {
          nombre: "Paciente1",
          apellido: "ApellidoPaciente1",
          edad: 54,
          email: "paciente1@gmail.com"
        }
      }),

      models.paciente.findOrCreate({
        where: {
          id: "2"
        },
        defaults: {
          nombre: "Paciente2",
          apellido: "ApellidoPaciente2",
          edad: 58,
          email: "paciente2@gmail.com"
        }
      }),

      models.paciente.findOrCreate({
        where: {
          id: "3"
        },
        defaults: {
          nombre: "Paciente3",
          apellido: "ApellidoPaciente3",
          edad: 58,
          email: "paciente3@gmail.com"
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
