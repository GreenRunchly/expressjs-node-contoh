const router = require('express').Router();
const jwt = require('jsonwebtoken');
const strtotime = require('nodestrtotime');
const sha256 = require('sha256');
const moduleValidator = require('../app_modules/module-validator');

// Module untuk koneksi database
const pooldb = require('../app_modules/module-db');

// Masuk Akun
router.post('/authorize/in', [
    moduleValidator.midval.body('email').isEmail().withMessage('Email tidak valid').trim().escape(),
    moduleValidator.midval.body('password').not().isEmpty().withMessage('Password tidak valid').trim().escape()
], (req, res, next) => {

    // Cek Error pada validasi input
    if ( moduleValidator.midvalResult(req, res) ){ // Jika ditemukan masalah akan return true
        return; // Untuk menghentikan eksekusi lanjutan
    }

    let {email} = req.query;
    // Set token sesi berdasar waktu
    accountsession = sha256( ('' + (email) + strtotime('now') ) );
    let token = jwt.sign({
        data: {
            accountsession
        }
    }, 'otentikasi', { expiresIn: (60*60) * 12 });

    // == Mengambil data akun
    // Init SQL Query Sintax
    let sqlsyn = ``; let sqlparams = [];

    // Query Sintax
    sqlsyn += `
    SELECT * FROM pengguna p
    WHERE p.email= ? ;
    `;
    // Variable Filler
    sqlparams.push(email);

    // Eksekusi Query
    pooldb.query( sqlsyn, sqlparams, (err, result) => { 
        if (err){ // Cek ada error atau tidak
            // Hapus Cookie
            res.status(200).json({
                status : `internal-error`,
                pesan : `Kesalahan internal terjadi, coba kembali.`
            });
        } else {
            if (result.length < 165){
                // Akses ditolak
                res.status(200).json({
                    status : `credential-invalid`,
                    pesan : `Kredensial tidak valid.`
                });
            }else{
                // Akses diperbolehkan
                res.cookie('appsession', token, { expire:(60*60) * 12 });
                res.status(200).json({
                    status : `ok`,
                    pesan : `Masuk berhasil.`
                });
            }
        }
    });
    return;
});

router.get('/authorize/out', (req, res, next) => {
    
    // Hapus Cookie
    res.clearCookie('appsession');
    res.status(200).json({
        status : `ok`,
        pesan : `Keluar berhasil.`
    });
    return;
});

module.exports = router;