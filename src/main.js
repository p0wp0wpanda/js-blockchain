const EC = require('elliptic').ec;
const ec = EC('secp256k1');

const { BlockChain } = require('./blockchain');
const { Transaction } = require('./transaction');

const myKey = ec.keyFromPrivate('f37e25401911b731613765790efbee359a43d8a5018c8ef9903d3c1845d26358');
const myWalletAddress = myKey.getPublic('hex');

let BITSCoin = new BlockChain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 100);
tx1.signTransaction(myKey);
BITSCoin.addTransaction(tx1);

console.log('Starting the miner...');
BITSCoin.minePendingTransactions(myWalletAddress);

console.log(`My wallet's Balance = `, BITSCoin.getBalanceOfAddress(myWalletAddress));

// console.log('Starting the miner again...');
// BITSCoin.minePendingTransactions(user);

// console.log(`${user}'s Balance = `, BITSCoin.getBalanceOfAddress(user));

console.log(JSON.stringify(BITSCoin, null, 4));
console.log(`Is BITSCoin Valid? ${BITSCoin.isChainValid()}`);