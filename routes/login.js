const express = require('express');
const app = express();
const Validator = require('fastest-validator');
const v = new Validator();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const SECRET_KEY = "uklnodejs";
const models = require('../models/')
const User = models.tb_user

app.post('/', async(req,res) => {
    const schema = {
        username: 'string|empty:false|unique:true|max:255',
        password: 'string|min:6'
    }
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.json({
            status: 'error',
            message: validate
        })
    }
    const user = await User.findOne({ where: { username: req.body.username } })
    if (!user) {
        return res.json({
            status: 'error',
            message: 'user tidak ditemukan'
        })
    }
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
        return res.json({
            status: 'error',
            message: 'wrong password'
        })
    }
    const payload = JSON.stringify(user)
    let token = jwt.sign(payload, SECRET_KEY)
    res.json({
        status: 'success',
        acces_token: token,
        token_type: "Bearer",
        user: user 
    })
})


module.exports = app