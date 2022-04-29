const express = require('express');
const app = express();
const models = require('../models/')
const Member = models.tb_member
const auth = require('../auth')
app.get('/',auth,async(req,res) => {
    await Member.findAll()
    .then((result) => {
        res.json(result)
    })
    .catch(error => {
        res.json(error)
    })
})

app.get('/:id',auth,async(req,res) => {
    await Member.findByPk(req.params.id)
    .then((result) => {
        res.json(result)
    })
    .catch(error => {
        res.json(error)
    })
})

app.post('/',auth,async(req,res) => {
    let data = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        jenis_kelamin: req.body.jenis_kelamin,
        tlp: req.body.tlp
    }
    await Member.create(data)
    .then((result) => {
        res.json({
            status: "success",
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
        nama: req.body.nama,
        alamat: req.body.alamat,
        jenis_kelamin: req.body.jenis_kelamin,
        tlp: req.body.tlp
    }
    await Member.update(data, {where : params})
    .then(() => {
        res.json({
            status: "success",
            message : "berhasil merubah member",
        })
    })
    .catch(error => {
        res.json(error)
    })
})

app.delete('/:id',auth,async(req,res) => {
    const params = {id : req.params.id}
    await Member.destroy({where : params})
    .then(() => {
        res.json({
            status: "success",
            message : "berhasil menghapus member",
        })
    })
    .catch(error => {
        res.json(error)
    })
})

module.exports = app