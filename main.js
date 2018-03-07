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

  }

  mineBlock(difficulty) {

  }
}
