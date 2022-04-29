const express = require('express');
const app = express();
const models = require('../models/')
const Transaksi = models.tb_transaksi
const DetailTransaksi = models.tb_detail_transaksi
const auth = require('../auth');
const { sequelize } = require('../models/');

app.get('/', async(req,res) => {
    DetailTransaksi.findAll({
        attributes: ['total_bayar', [sequelize.fn('SUM', sequelize.col('total_bayar')),'total_bayar'], [sequelize.fn('count', sequelize.col('total_bayar')),'total_bayar'] ],
        include: {
            model: models.tb_transaksi,
            where : {dibayar : "dibayar"}
        }  
    })
    .then(result => {
        res.json(result)
    })

})


module.exports = app