require('dotenv').config(); // Load Configuration
const jwt = require('jsonwebtoken');
const { decode } = require('punycode');

let moduleOtentikasi = {}; // Initial Module

moduleOtentikasi.otentikasi = (req, res, next) => { // Otentikasi Sesi Akun

    if (!req.cookies.appsession){
        res.status(401).json({
            status:`authfailed`,
            pesan:`Tidak terotentikasi, harap masuk terlebih dahulu.`
        });
        return;
    }else{
        let {appsession} = req.cookies;
        jwt.verify(appsession, 'otentikasi', (err, decoded) => {
            if (err){  // Cek error atau tidak
                res.status(401).json({
                    status:`authfailed`,
                    pesan:`Otentikasi gagal, harap coba lagi.`
                }); 
                res.clearCookie(appsession);
                return;
            }else{  // Jika tidak ada error
                let {accountsession} = decoded.data;
                req.bridgesession = accountsession;
                next();
            }
        });
        return;
    }

}

module.exports = moduleOtentikasi;