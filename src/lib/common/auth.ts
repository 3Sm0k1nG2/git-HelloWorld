import { AES,  enc,  HmacMD5 } from "crypto-js";


function encrypt(data:string, secret){
    return AES.encrypt(data, secret).toString();
}

function decrypt(ciphertext, secret){
    return AES.decrypt(ciphertext, secret).toString(enc.Utf8);
}

function hashHmac(data, secret){
    return HmacMD5(data, secret).toString();
}


export {
    encrypt,
    decrypt,
    hashHmac
}