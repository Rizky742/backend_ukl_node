module.exports = (sequelize, DataTypes) => {
    const tbTransaksi = sequelize.define('tb_transaksi', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        id_outlet: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tb_outlet',
                key: 'id'
            }
        },
        kode_invoice: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_member: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tb_member',
                key: 'id'
            }
        },
        tgl: {
            type: DataTypes.DATE,
        },
        batas_waktu: {
            type: DataTypes.DATE,
        },
        tgl_bayar: {
            type: DataTypes.DATE,
        },
        biaya_tambahan: {
            type: DataTypes.INTEGER,
        },
        diskon: {
            type: DataTypes.DOUBLE,
        },
        pajak: {
            type: DataTypes.INTEGER,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['baru', 'proses', 'selesai', 'diambil']
        },
        dibayar: {
            type: DataTypes.ENUM,
            values: ['dibayar', 'belum_dibayar']
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tb_user',
                key: 'id'
            }
        }
    }, {
        tableName: 'tb_transaksi',
        timestamps: false
    })

    tbTransaksi.associate = models => {
        tbTransaksi.hasMany(models.tb_detail_transaksi, {
            foreignKey: 'id'
        })
        tbTransaksi.belongsTo(models.tb_member, {
            foreignKey: 'id_member',
            onDelete: 'CASCADE',
        })
        tbTransaksi.belongsTo(models.tb_outlet, {
            foreignKey: 'id_outlet'
        })
        tbTransaksi.belongsTo(models.tb_user, {
            foreignKey: 'id_user'
        })
    }

    return tbTransaksi;
}