'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('tb_user', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nama: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      id_outlet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_outlet',
          key: 'id'
        }
      },
      role: {
        type: Sequelize.ENUM,
        values: ['admin','kasir','owner']
      },
      });
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.dropTable('tb_user');
  }
};
