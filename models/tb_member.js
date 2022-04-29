module.exports = (sequelize, DataTypes) => {
    const tbMember = sequelize.define('tb_member', {
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
          jenis_kelamin: {
            type: DataTypes.ENUM,
            values: ['L','P']
          },
          tlp: {
            type: DataTypes.STRING,
          }
    }, {
        tableName: 'tb_member',
        timestamps: false
    })

    tbMember.associate = models => {
        tbMember.hasMany(models.tb_transaksi, {
            foreignKey: "id",
            onDelete: 'CASCADE',
        })
    }
    return tbMember;
}