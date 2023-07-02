const validator = require('validator');
const midval = require('express-validator');

let thismodule = {};

thismodule.validator = validator;

thismodule.midval = midval;

thismodule.midvalResult = (req, res, next) => {
    // Validasi Input
    const errorValidasiInput = midval.validationResult(req);
    if (!errorValidasiInput.isEmpty()) { // Jika tidak ada error
        res.status(200).json({
            status: `invalid-input`,
            pesan : errorValidasiInput.errors[0].msg
        });
        return true;
    }else{
        return false;
    }
}

module.exports = thismodule;