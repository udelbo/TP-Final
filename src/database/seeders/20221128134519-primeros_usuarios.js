'use strict';

const models = require('../models/index')
const bcrypt = require('bcryptjs')

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
          email: "robertocarlos@gmail.com",
          edad: 34,
          password: bcrypt.hashSync('password', 10)
        }
      }),

      models.usuario.findOrCreate({
        where: {
          id: "2"
        },
        defaults: {
          nombre: "Juana2",
          apellido: "Irene2",
          email: "juanairene@hotmail.com",
          edad: 44,
          password: bcrypt.hashSync('password', 10)
        }
      }),

      models.usuario.findOrCreate({
        where: {
          id: "3"
        },
        defaults: {
          nombre: "Rick",
          apellido: "Sosa",
          email: "rd@hotmail.com",
          edad: 56,
          password: bcrypt.hashSync('password', 10)
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
