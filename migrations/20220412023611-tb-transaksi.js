'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('tb_transaksi', { 
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
      kode_invoice: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      id_member: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_member',
          key: 'id'
        }
      },
      tgl: {
        type: Sequelize.DATE,
      },
      batas_waktu: {
        type: Sequelize.DATE,
      },
      tgl_bayar: {
        type: Sequelize.DATE,
      },
      biaya_tambahan: {
        type: Sequelize.INTEGER,
      },
      diskon: {
        type: Sequelize.DOUBLE,
      },
      pajak: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['baru','proses','selesai','diambil']
      },
      dibayar: {
        type: Sequelize.ENUM,
        values: ['dibayar','belum_dibayar']
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tb_user',
          key: 'id'
        }

      }
    });

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('tb_transaksi');
  }
};
