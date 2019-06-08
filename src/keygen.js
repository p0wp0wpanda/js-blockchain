const EC = require('elliptic').ec;
const ec = EC('secp256k1');

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');
const privateKey = key.getPrivate('hex');

console.log(`Public key : ${publicKey}\nPrivate Key : ${privateKey}`);


//Public key : 04478d4aec6142da6bcbecfcb8f8b53dde7ae2c9ddd5670dec0570dd4fb12c0f449b7508630e9f7fc59db6bcd4d5f8d27f8b280f600c0964d3c6e1af02af259c36
//Private Key : f37e25401911b731613765790efbee359a43d8a5018c8ef9903d3c1845d26358
