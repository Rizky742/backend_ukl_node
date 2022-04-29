const express = require('express');
const app = express();
const models = require('../models/')
const Transaksi = models.tb_transaksi
const DetailTransaksi = models.tb_detail_transaksi
const Paket = models.tb_paket
const auth = require('../auth')

app.get('/', auth, async (req, res) => {
    await DetailTransaksi.findAll({
        include: [
            {
                model: models.tb_transaksi,
                include: [
                    { model: models.tb_outlet },
                    { model: models.tb_member },
                    {
                        model: models.tb_user,
                        attributes: ['id', 'nama', 'username', 'id_outlet', 'role'],
                        include: {
                            model: models.tb_outlet
                        }
                    }
                ]
            },
            { model: models.tb_paket },
        ]
    })
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.json(error)
        })
})

app.get('/konfirmasi', auth, async (req, res) => {
    await DetailTransaksi.findAll({
        include: [
            {
                model: models.tb_transaksi,
                where: { dibayar: "belum_dibayar" },
                include: [
                    { model: models.tb_outlet },
                    { model: models.tb_member },
                    {
                        model: models.tb_user,
                        attributes: ['id', 'nama', 'username', 'id_outlet', 'role'],
                        include: {
                            model: models.tb_outlet
                        }
                    }
                ]
            },
            { model: models.tb_paket },
        ]
    })
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.json(error)
        })
})

app.post('/', auth, async (req, res) => {
    let invoice = `LNDRY${Date.now()}`
    var batas_waktu = new Date()
    
    batas_waktu.setDate(batas_waktu.getDate() + 7)
    let data = {
        id_outlet: req.body.id_outlet,
        kode_invoice: invoice,
        id_member: req.body.id_member,
        tgl: Date.now(),
        batas_waktu: batas_waktu,
        biaya_tambahan: req.body.biaya_tambahan,
        diskon: req.body.diskon,
        pajak: req.body.pajak,
        status: "baru",
        dibayar: "belum_dibayar",
        id_user: req.body.id_user
    }
    await Transaksi.create(data)
        .then(async (result) => {
            let paket = await Paket.findByPk(req.body.id_paket)
            let jumlah = req.body.qty
            let harga = paket.harga
            let diskon = req.body.diskon
            let pajak = req.body.pajak
            let biaya_tambahan = req.body.biaya_tambahan
            let total = (jumlah * harga) - (diskon / 100 * harga * jumlah) + biaya_tambahan
            let total_harga = total + (pajak / 100 * total)
            let data2 = {
                id_transaksi: result.id,
                id_paket: req.body.id_paket,
                qty: req.body.qty,
                keterangan: req.body.keterangan,
                total_harga: total_harga
            }
            console.log(data2)
            await DetailTransaksi.create(data2)
                .then(() => {
                    res.json({
                        message: "Transaksi berhasil"
                    })
                })
                .catch(error => {
                    res.json(error)
                })
        })
        .catch(error => {
            res.json(error)
        })
})

app.put('/bayar/:id_transaksi',auth,async (req, res) => {
    let params = req.params.id_transaksi
    let data = {
        total_bayar: req.body.total_bayar
    }
    let data2 = {
        dibayar: "dibayar",
        tgl_bayar: Date.now()
    }
    let tagihan = await DetailTransaksi.findOne({ where: { id_transaksi: params } })
    console.log(tagihan.total_harga)

    if (tagihan.total_harga > data.total_bayar) {
        res.json({
            status: "error",
            message: "Maaf uang anda kurang"
        })
    } else {
        DetailTransaksi.update(data, { where: { id_transaksi: params } })
            .then(() => {
                Transaksi.update(data2, {where: {id : params}})
                .then(() => {
                    res.json({
                        message: "Pembayaran Berhasil"
                    })
                })
                .catch(error => {
                    res.json(error)
                })
            })
            .catch(error => {
                res.json(error)
            })
    }



})

app.put('/ubah-status/:id_transaksi',auth,async(req,res) => {
    let params = req.params.id_transaksi
    let data = {
        status: req.body.status
    }
    Transaksi.update(data, {where: {id : params}})
    .then(() => {
        res.json({
            status : "success",
            message: "Status berhasil di ubah"
        })
    })
    .catch(error => {
        res.json(error)
    })
})

module.exports = app