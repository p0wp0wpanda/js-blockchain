const SHA256 = require('crypto-js/sha256');
//const moment = require('moment');

class Block {
    constructor (index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
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
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
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
    }

    createGenesisBlock() {
        return new Block(0, "29/05/2019", "Genesis Block", "0");
    }

    getLatestBlock () {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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

console.log("Mining block 1...");
BITSCoin.addBlock(new Block (1, "29/05/2019", { amount: 4 }));

console.log("Mining block 2...");
BITSCoin.addBlock(new Block(2, "29/05/2019", { amount: 3 }));

// console.log(JSON.stringify(BITSCoin, null, 4));
// console.log(`Is BITSCoin Valid? ${BITSCoin.isChainValid()}`);