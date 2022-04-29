'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('tb_detail_transaksi', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_transaksi: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_transaksi',
          key: 'id'
        }
      },
      id_paket: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_paket',
          key: 'id'
        }
      },
      qty: {
        type: Sequelize.DOUBLE,
      },
      keterangan: {
        type: Sequelize.TEXT,
      },
      total_harga: {
        type: Sequelize.INTEGER,
      },
      total_bayar: {
        type: Sequelize.INTEGER,
      }
     });
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.dropTable('tb_detail_transaksi');
  }
};
