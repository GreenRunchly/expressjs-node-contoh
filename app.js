const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const moduleOtentikasi = require('./app_modules/module-otentikasi');
// const moduleAlat = require('./app_modules/module-tools');

// Init Express App
const app = express();

// Agar saat crash web tidak shutdown
app.on('uncaughtException', function (err) {
    logger.error(err);
    logger.info("Node is recovering...");
});

// Set the view engine to ejs
app.engine('html', require('ejs').renderFile); //diganti biar bisa pakai ekstensi html dari app.set('view engine', 'ejs');
app.set("view options", {
    openDelimiter: "<",
    delimiter: "?",
    closeDelimiter: ">",
});

// Use Cookie
app.use(cookieParser());

// Use JSON
app.use(express.json());

// Form Data
app.use(express.urlencoded({
    extended: true
}));

// Set CORS local dan null (file)
app.use(cors({
    origin: ['http://127.0.0.1', 'null']
}));

app.use('/api', require('./routers/noneedcookie.js'));
app.use('/api', moduleOtentikasi.otentikasi ,require('./routers/needcookie.js'));

// 404 Not Found
app.use('/*', (req, res, next) => {
    res.status(404).json({
        status:`bruh`,
        pesan:`Ingin kemana?`
    });
    return;
});

// Web Server
const WEB_PORT = 1878;
app.listen(WEB_PORT, () => {
    console.log(`http port ${WEB_PORT} running...`);
});