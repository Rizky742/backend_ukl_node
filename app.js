const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const register = require('./routes/register');
const user = require('./routes/user');
const outlet = require('./routes/outlet');
const member = require('./routes/member');
const paket = require('./routes/paket');
const transaksi = require('./routes/transaksi');
const login = require('./routes/login');
const laporan = require('./routes/laporan');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', register);
app.use('/user', user);
app.use('/outlet', outlet);
app.use('/member', member);
app.use('/paket', paket);
app.use('/transaksi', transaksi);
app.use('/login', login);
app.use('/laporan', laporan);

module.exports = app;
