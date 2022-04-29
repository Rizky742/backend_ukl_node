'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.createTable('tb_member', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        nama: {
          type: Sequelize.STRING,
        },
        alamat: {
          type: Sequelize.TEXT,
        },
        jenis_kelamin: {
          type: Sequelize.ENUM,
          values: ['L','P']
        },
        tlp: {
          type: Sequelize.STRING,
        }
      });

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.dropTable('tb_member');
  }
};
