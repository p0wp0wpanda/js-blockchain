const {BlockChain, Transaction} = require('./blockchain');

const BITSCoin = new BlockChain();

BITSCoin.createTransaction(new Transaction('address 1', 'address 2', 100));
BITSCoin.createTransaction(new Transaction('address 2', 'address 1', 50));

const user = "xd123"

console.log('Starting the miner...');
BITSCoin.minePendingTransactions(user);

console.log(`${user}'s Balance = `, BITSCoin.getBalanceOfAddress(user));

console.log('Starting the miner again...');
BITSCoin.minePendingTransactions(user);

console.log(`${user}'s Balance = `, BITSCoin.getBalanceOfAddress(user));

//console.log(JSON.stringify(BITSCoin, null, 4));
console.log(`Is BITSCoin Valid? ${BITSCoin.isChainValid()}`);