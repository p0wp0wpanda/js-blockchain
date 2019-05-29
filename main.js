const SHA256 = require('crypto-js/sha256');
//const moment = require('moment');

class Transaction {
    constructor (fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
class Block {
    constructor (timestamp, transaction, previousHash = '') {
        this.timestamp = timestamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0; 
        //nonce is a completely random number that helps in changing the hash of a
        //block so that it can satisfy a particular condition set by the chain
        //eg: Should start with a certain number of 0's in BitCoin's case
        //without nonce the hash of a block depends only on index, timestamp,
        //data etc which are constant and hence the hash will always be the same.
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) { //here difficulty is the number of 0's a hash should begin with.
    
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) { //creates string of 0's difficulty long.
            this.nonce ++;
            this.hash = this.calculateHash();
        }

        console.log(`Block mined with hash = ${this.hash}`);
    }
}

class BlockChain {
    constructor () {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.miningReward = 420;
    }

    createGenesisBlock() {
        return new Block("29/05/2019", [], "0");
    }

    getLatestBlock () {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress) {
        const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
        this.pendingTransactions.push(rewardTx);

        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!');
        this.chain.push(block);

        this.pendingTransactions = [];
    }

    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        
        for (const block of this.chain) {
            for (const trans of block.transaction) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }

                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i ++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

var BITSCoin = new BlockChain();

BITSCoin.createTransaction(new Transaction('address 1', 'address 2', 100));
BITSCoin.createTransaction(new Transaction('address 2', 'address 1', 50));

console.log('Starting the miner...');
BITSCoin.minePendingTransactions('xd123');

console.log('Balance = ', BITSCoin.getBalanceOfAddress('xd123')); //Balance here will still be zero since the mining reward is added to the pending transactions
                                                                  //and will only show up in the block chain when the next block is mined.  
console.log('Starting the miner again...');
BITSCoin.minePendingTransactions('xd123');

console.log('Balance = ', BITSCoin.getBalanceOfAddress('xd123'));

console.log(JSON.stringify(BITSCoin, null, 4));
console.log(`Is BITSCoin Valid? ${BITSCoin.isChainValid()}`);