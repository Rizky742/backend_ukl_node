const express = require('express');
const app = express();
const models = require('../models/')
const Transaksi = models.tb_transaksi
const DetailTransaksi = models.tb_detail_transaksi
const auth = require('../auth');
const { sequelize } = require('../models/');
const Sequelize = require('sequelize')
const db = require('../db/db')
const Op = Sequelize.Op;

//Query ambil pendapatan dan kerugian bulan ini

// SELECT SUM(tb_detail_transaksi.total_harga) AS total_pendapatan_bulan  FROM tb_transaksi, tb_detail_transaksi, tb_outlet, tb_paket WHERE tb_transaksi.id = tb_detail_transaksi.id_transaksi AND tb_transaksi.dibayar = 'dibayar' AND MONTH(tb_transaksi.tgl_bayar) = MONTH(NOW()) AND tb_detail_transaksi.id_paket = tb_paket.id AND tb_paket.id_outlet = tb_outlet.id AND tb_outlet.id = 1

// SELECT SUM(tb_detail_transaksi.total_harga) AS total_belum_bayar_bulan_ini  FROM tb_transaksi, tb_detail_transaksi, tb_outlet, tb_paket WHERE tb_transaksi.id = tb_detail_transaksi.id_transaksi AND tb_transaksi.dibayar = 'belum_dibayar' AND MONTH(tb_transaksi.tgl) = MONTH(NOW()) AND tb_detail_transaksi.id_paket = tb_paket.id AND tb_paket.id_outlet = tb_outlet.id AND tb_outlet.id = 1


app.get('/bulan/:id',auth,async(req,res) => {
    // DetailTransaksi.findAll({
    //     attributes: [[sequelize.fn('sum', sequelize.col('total_harga')),'total']],
    //     include: {
    //         model : models.tb_transaksi,
    //         attributes: [],
    //         where : {[Op.and] : [{dibayar : "dibayar"}, {tgl_bayar : Date.now()}]}
    //     },
    // })
    db.promise().query(`SELECT SUM(tb_detail_transaksi.total_harga) AS total_pendapatan_bulan FROM tb_detail_transaksi, tb_transaksi WHERE tb_transaksi.id = tb_detail_transaksi.id_transaksi AND tb_transaksi.dibayar = "dibayar" AND MONTH(tb_transaksi.tgl_bayar) = MONTH(NOW()) AND tb_transaksi.id_outlet = ${req.params.id}`)
    .then(result => {
        res.json(result[0][0])
    })

})

app.get('/tahun/:id',auth,async(req,res) => {
    // DetailTransaksi.findAll({
    //     attributes: [[sequelize.fn('sum', sequelize.col('total_harga')),'total']],
    //     include: {
    //         model : models.tb_transaksi,
    //         attributes: [],
    //         where : {[Op.and] : [{dibayar : "dibayar"}, {tgl_bayar : Date.now()}]}
    //     },
    // })
    db.promise().query(`SELECT SUM(tb_detail_transaksi.total_harga) AS total_pendapatan_tahun FROM tb_detail_transaksi, tb_transaksi WHERE tb_transaksi.id = tb_detail_transaksi.id_transaksi AND tb_transaksi.dibayar = "dibayar" AND YEAR(tb_transaksi.tgl_bayar) = YEAR(NOW()) AND tb_transaksi.id_outlet = ${req.params.id}`)
    .then(result => {
        res.json(result[0][0])
    })

})

app.get('/hari/:id',auth,async(req,res) => {
    // DetailTransaksi.findAll({
    //     attributes: [[sequelize.fn('sum', sequelize.col('total_harga')),'total']],
    //     include: {
    //         model : models.tb_transaksi,
    //         attributes: [],
    //         where : {[Op.and] : [{dibayar : "dibayar"}, {tgl_bayar : Date.now()}]}
    //     },
    // })
    db.promise().query(`SELECT SUM(tb_detail_transaksi.total_harga) AS total_pendapatan_hari FROM tb_detail_transaksi, tb_transaksi WHERE tb_transaksi.id = tb_detail_transaksi.id_transaksi AND tb_transaksi.dibayar = "dibayar" AND DAY(tb_transaksi.tgl_bayar) = DAY(NOW()) AND tb_transaksi.id_outlet = ${req.params.id}`)
    .then(result => {
        res.json(result[0][0])
    })

})

app.get('/final/:id',auth,async(req,res) => {
    // DetailTransaksi.findAll({
    //     attributes: [[sequelize.fn('sum', sequelize.col('total_harga')),'total']],
    //     include: {
    //         model : models.tb_transaksi,
    //         attributes: [],
    //         where : {[Op.and] : [{dibayar : "dibayar"}, {tgl_bayar : Date.now()}]}
    //     },
    // })
    db.promise().query(`SELECT tb_paket.nama_paket, COUNT(tb_detail_transaksi.id_paket) AS total_transaksi, SUM(IF(tb_transaksi.dibayar='dibayar',tb_detail_transaksi.total_harga,0)) AS total_harga_lunas, SUM(IF(tb_transaksi.dibayar='belum_dibayar',tb_detail_transaksi.total_harga,0)) AS total_harga_belum_lunas, SUM(IF(tb_transaksi.dibayar='dibayar',1,0)) AS jmllunas, SUM(IF(tb_transaksi.dibayar='belum_dibayar',1,0)) AS jmlblmlunas, tb_transaksi.dibayar, tb_detail_transaksi.id_transaksi, tb_transaksi.id, tb_paket.id, tb_paket.id_outlet FROM tb_detail_transaksi, tb_transaksi, tb_paket WHERE tb_transaksi.id = tb_detail_transaksi.id_transaksi AND tb_transaksi.id AND tb_paket.id = tb_detail_transaksi.id_paket AND tb_paket.id_outlet = ${req.params.id} GROUP BY tb_paket.id`)
    .then(result => {
        res.json(result[0][0])
    })

})
module.exports = app