const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = EC('secp256k1');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateTransactionHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey) {
        if (signingKey.getPublic('hex') !== this.fromAddress) {
            throw new Error("You cannot sign transactions for other wallets");
        }

        const hashTx = this.calculateTransactionHash()
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');

        console.log(`hashTx : ${hashTx}`);
    }

    isValid() {
        if (this.fromAddress === null) {
            return true;
        }

        if (!this.signature || this.signature.length === 0) {
            throw new Error("No signature found for this transaction");
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateTransactionHash(), this.signature);
    }
}

module.exports.Transaction = Transaction;