/*
    Module untuk penanganan generate random number dan lainnya di masa mendatang
    Daftar Function : 
    numberGen( jumlahDigit ); return angka
*/

let tools = {};

// Number Gen (Hanya jarak 2-Sekian)
tools.numberGen = function (antara=6){
    let digit = '';
    for (let index = 1; index < antara; index++) {
        digit += '0';
    }
    return Math.floor( parseInt('1' + digit) + ( Math.random() * parseInt('9' + digit) ) );
}

tools.base64Encode = function (input){
    if (input){
        return Buffer.from( input, 'utf8').toString('base64');
    }else{
        return ;
    }
}

tools.base64Decode = function (input){
    if (input){
        return Buffer.from( input, 'base64').toString('utf8');
    }else{
        return 0;
    }
}

module.exports = tools;