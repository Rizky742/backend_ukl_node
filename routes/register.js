const express = require('express');
const app = express();
const Validator = require('fastest-validator');
const models = require('../models/')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const v = new Validator();
const User = models.tb_user
const SECRET_KEY = "uklnodejs";

app.post('/', async(req, res) => {
    const schema = {
        username: 'string|empty:false|unique:true|max:255',
        password: 'string|min:6'
    }
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(404).json({
            status: 'error',
            message: validate
        })
    }
    const password = await bcrypt.hash(req.body.password, 10);
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password: password,
        id_outlet: req.body.id_outlet,
        role: req.body.role
    }
    await User.create(data)
        .then(() => {
            User.findOne({ where: { username: req.body.username } })
                .then(result => {
                    let payload = JSON.stringify(result)
                    let token = jwt.sign(payload, SECRET_KEY)
                    res.json({
                        acces_token: token,
                        token_type: "Bearer",
                        user: result
                    })
                })
                .catch(error => {
                    res.json({
                        message: error
                    })
                })
        })
        .catch(error => {
            res.json({
                message: error
            })
        })
})

module.exports = app