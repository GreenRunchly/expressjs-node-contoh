const router = require('express').Router();

router.get('/users/me', (req, res, next) => {

    res.status(200).json({
        status : `ok`,
        pesan : `Menampilkan data...`,
        userid : req.bridgesession
    });
    return;
});

router.get('/users/:userid', (req, res, next) => {
    let {userid} = req.params;
    res.status(200).json({
        status : `ok`,
        pesan : `Menampilkan data...`,
        userid
    });
    return;
});

module.exports = router;