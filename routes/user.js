const express = require('express');
const app = express();
const models = require('../models/')
const User = models.tb_user
const bcrypt = require('bcrypt')
const auth = require('../auth')

app.post('/',auth, async (req, res) => {
    const password = await bcrypt.hash(req.body.password, 10);
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password: password,
        id_outlet: req.body.id_outlet,
        role: req.body.role
    }
    await User.create(data)
        .then((result) => {
            res.json({
                status: "success",
                user: result
            })
        })
        .catch(error => {
            res.json({
                message: error
            })
        })
})


app.get('/',auth,async (req, res) => {
    await User.findAll({
        attributes: ['id', 'nama', 'username', 'id_outlet', 'role'],
        include: {
            model: models.tb_outlet
        }
    })
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.json(error)
        })
})

app.put('/:id', auth, async (req, res) => {
    let params = { id: req.params.id };
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        id_outlet: req.body.id_outlet,
        role: req.body.role
    }
    await User.update(data, { where: params })
        .then((result) => {
            res.json({
                status: "success",
                message: "Sukes merubah User"
            })
        })
        .catch(error => {
            res.json({
                message: error
            })
        })
})

app.put('/edit-password/:id', auth, async (req, res) => {
    let params = { id: req.params.id };
    let cari = await User.findOne({ where: params })
    let oldPassword = await bcrypt.compare(req.body.oldPassword, cari.password)
    if (!oldPassword) {
        return res.json("Password anda tidak sesuai")
    }
    let newPassword = await bcrypt.hash(req.body.newPassword, 10)
    let data = {
        password: newPassword,
    }
    await User.update(data, { where: params })
        .then(() => {
            res.json({
                status: "success",
                message: "Sukes merubah password"
            })
        })
        .catch(error => {
            res.json({
                message: error
            })
        })
})


app.delete('/:id',auth, async (req, res) => {
    let params = { id: req.params.id };
    await User.destroy({ where: params })
        .then((result) => {
            res.json({
                status: "success",
                message: "Success menghapus user"
            })
        })
        .catch(error => {
            res.json({
                message: error
            })
        })
})

module.exports = app