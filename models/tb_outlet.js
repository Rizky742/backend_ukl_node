module.exports = (sequelize, DataTypes) => {
    const tbOutlet = sequelize.define('tb_outlet', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          nama: {
            type: DataTypes.STRING,
          },
          alamat: {
            type: DataTypes.TEXT,
          },
          tlp: {
            type: DataTypes.STRING,
          }
    }, {
        tableName: 'tb_outlet',
        timestamps: false
    })
    tbOutlet.associate = models => {
        tbOutlet.hasMany(models.tb_transaksi, {
            foreignKey: 'id'
        })
        tbOutlet.hasMany(models.tb_user, {
            foreignKey: 'id'
        })
        tbOutlet.hasMany(models.tb_paket, {
            foreignKey: 'id'
        })
    }

    return tbOutlet;
}