const cryptoJs = require('crypto-js');

function Dycryping(encrypted){
    const result = cryptoJs.AES.decrypt(
        encrypted,
        process.env.PASSWORD_SECRET_HASH
    ).toString(cryptoJs.enc.Utf8);
    return result;
}
