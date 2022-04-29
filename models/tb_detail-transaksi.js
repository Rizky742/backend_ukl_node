module.exports = (sequelize, DataTypes) => {
    const tbDetailTransaksi = sequelize.define('tb_detail_transaksi', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        id_transaksi: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tb_transaksi',
                key: 'id'
            }
        },
        id_paket: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tb_paket',
                key: 'id'
            }
        },
        qty: {
            type: DataTypes.DOUBLE,
        },
        keterangan: {
            type: DataTypes.TEXT,
        },
        total_harga: {
            type: DataTypes.INTEGER,
        },
        total_bayar: {
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: 'tb_detail_transaksi',
        timestamps: false
    })
    tbDetailTransaksi.associate = models => {
        tbDetailTransaksi.belongsTo(models.tb_transaksi, {
            foreignKey: 'id_transaksi'
        })
        tbDetailTransaksi.belongsTo(models.tb_paket, {
            foreignKey: 'id_paket'
        })

    }
    return tbDetailTransaksi;
}