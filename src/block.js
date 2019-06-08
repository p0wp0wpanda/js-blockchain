const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
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

        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) { //creates string with difficulty number of 0s.
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log(`Block mined with hash = ${this.hash}`);
    }

    hasValidTransactions() {
        for (const tx of this.transactions) {
            if(!tx.isValid()) {
                return false
            }

            return true;
        }
    }
}

module.exports.Block = Block;