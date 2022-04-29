const express = require('express');
const app = express();
const models = require('../models/')
const Outlet = models.tb_outlet
const Paket = models.tb_paket
const auth = require('../auth')


app.get('/', auth,async (req, res) => {
    await Outlet.findAll()
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.json(error)
        })
})

app.get('/:id',auth,async (req, res) => {
    await Outlet.findByPk(req.params.id)
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.json(error)
        })
})

app.post('/',auth,async (req, res) => {
    let data = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        tlp: req.body.tlp
    }
    await Outlet.create(data)
        .then(result => {
            res.json({
                status: "success",
                data: result
            })
        })
        .catch(error => {
            res.json(error)
        })
})

app.put('/:id',auth,async (req, res) => {
    const params = { id: req.params.id }
    let data = {
        nama: req.body.nama,
        alamat: req.body.alamat,
        tlp: req.body.tlp
    }
    await Outlet.update(data, { where: params })
        .then(() => {
            res.json({
                status: "success",
                message: "berhasil merubah outlet",
            })
        })
        .catch(error => {
            res.json(error)
        })
})

app.delete('/:id',auth,async (req, res) => {
    const params = { id: req.params.id }
    await Outlet.destroy({ where: params })
        .then(() => {
            Paket.destroy({ where: { id_outlet: req.params.id } })
            res.json({
                status: "success",
                message: "berhasil menghapus outlet",
            })
        })
        .catch(error => {
            res.json(error)
        })
})


// app.post('/sms', (req, res) => {
//     const accountSid = "AC0fb2b4d1d7f4f3dc1063adb87dd54c15";
//     const authToken = "528738684159508c3589fd3d839f04cb";
//     const client = require('twilio')(accountSid, authToken);

//     client.messages
//         .create({
//             from: 'whatsapp:+14155238886',
//             body: 'Hello there!',
//             to: 'whatsapp:+6281249142352'
//         })
//         .then(message => console.log(message.sid));
        
//     })

    
module.exports = app