module.exports = (sequelize,DataTypes) => {
    const tbPaket = sequelize.define('tb_paket', {
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
          jenis: {
            type: DataTypes.ENUM,
            values: ['kiloan','selimut','bed_cover','kaos','lain']
          },
          nama_paket: {
            type: DataTypes.STRING,
          },
          harga: {
            type: DataTypes.INTEGER,
          }
    }, {
        tableName: 'tb_paket',
        timestamps: false
    })

    tbPaket.associate = models => {
        tbPaket.hasMany(models.tb_detail_transaksi, {
            foreignKey: "id"
        })
        tbPaket.belongsTo(models.tb_outlet, {
            foreignKey: "id_outlet"
        })
    }
    return tbPaket;
}