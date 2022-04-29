'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('tb_paket', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_outlet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_outlet',
          key: 'id'
        }
      },
      jenis: {
        type: Sequelize.ENUM,
        values: ['kiloan','selimut','bed_cover','kaos','lain']
      },
      nama_paket: {
        type: Sequelize.STRING,
      },
      harga: {
        type: Sequelize.INTEGER,
      }
    });

  },

  async down(queryInterface, Sequelize) {

     await queryInterface.dropTable('tb_paket');
  }
};
