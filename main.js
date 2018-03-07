const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(timestamp, data) {
    // Where in the chain the block is located
    this.index = 0;
    // Shows when the block was created
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = "0";
    this.hash = this.calculateHash();
    // Important for building in a mining mechanism
    this.nonce = 0;
  }

  // Using the irreversible SHA256 function from the crypto-js library
  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
  }

  mineBlock(difficulty) {

  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block("01/01/2018", "Genesis Block");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}
