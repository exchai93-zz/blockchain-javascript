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

  checkValid() {
    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      // Checks whether currentBlocks' info has been tampered with
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

let jsChain = new Blockchain();
jsChain.addBlock(new Block("07/03/2018", {amount: 5}));
jsChain.addBlock(new Block("08/03/2018", {amount: 10}));

console.log(JSON.stringify(jsChain, null, 4));
console.log("Is blockchain valid? " + jsChain.checkValid());

// Tampering with the blockchain. Override the data in the first block
jsChain.chain[1].data = { amount: 100 };
// Recalculate the hash of the block 
jsChain.chain[1].hash = jsChain.chain[1].calculateHash();

console.log("Is blockchain valid? " + jsChain.checkValid());
