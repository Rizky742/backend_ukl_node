module.exports = (sequelize,DataTypes) => {
    const tbUser = sequelize.define('tb_user', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          nama: {
            type: DataTypes.STRING,
          },
          username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          id_outlet: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'tb_outlet',
              key: 'id'
            }
          },
          role: {
            type: DataTypes.ENUM,
            values: ['admin','kasir','owner']
          }
    }, {
        tableName: 'tb_user',
        timestamps: false
    })
    tbUser.associate = models => {
        tbUser.hasMany(models.tb_transaksi, {
            foreignKey: 'id_user'
        })
        tbUser.belongsTo(models.tb_outlet, {
            foreignKey: 'id_outlet'
        })
    }
    return tbUser;
}