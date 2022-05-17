const express = require('express');
const app = express();
const models = require('../models/')
const Paket = models.tb_paket
const auth = require('../auth')

app.get('/test/:id',auth,async(req, res) => {
    await Paket.findAll({
         include: {
             model : models.tb_outlet,
             where: {id : req.params.id}
         }
     })
         .then(result => {
             res.json(result)
         })
         .catch(error => {
             res.json(error)
         })
 })

app.get('/:id',auth,async(req, res) => {
    await Paket.findByPk(req.params.id,{
         include: {
             model : models.tb_outlet
         }
     })
         .then(result => {
             res.json(result)
         })
         .catch(error => {
             res.json(error)
         })
 })

 app.post('/',auth,async(req,res) => {
    let data = {
        id_outlet : req.body.id_outlet,
        jenis : req.body.jenis,
        nama_paket: req.body.nama_paket,
        harga: req.body.harga
    }
    await Paket.create(data)
    .then(result => {
        res.json({
            status : "success",
            data : result
        })
    })
    .catch(error => {
        res.json(error)
    })
})

app.put('/:id',auth,async(req,res) => {
    const params = {id : req.params.id}
    let data = {
        id_outlet : req.body.id_outlet,
        jenis : req.body.jenis,
        nama_paket: req.body.nama_paket,
        harga: req.body.harga
    }
    await Paket.update(data, {where : params})
    .then(() => {
        res.json({
            status : "success",
            message : "berhasil merubah paket",
        })
    })
    .catch(error => {
        res.json(error)
    })
})

app.delete('/:id',auth,async(req,res) => {
    const params = {id : req.params.id}
    await Paket.destroy({where : params})
    .then(() => {
        res.json({
            status : "success",
            message : "berhasil menghapus outlet",
        })
    })
    .catch(error => {
        res.json(error)
    })
})


module.exports = app