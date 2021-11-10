import { Block } from "./block";

export class Blockchain {
    chain: Block[]
    constructor() {
        this.chain = [Block.genesis()]
    }

    addBlock(data: string[]): Block {
        const lastBlock = this.chain[this.chain.length - 1]
        const newBlock = Block.mineBlock(lastBlock, data)
        this.chain.push(newBlock)
        return newBlock
    }

    static isValidChain(chain: Block[]) {
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false
        }

        for (let i=1; i < chain.length; i++) {
            const block = chain[i]
            const lastBlock = chain[i-1]

            if (block.lastHash !== lastBlock.hash
            || block.hash !== Block.blockHash(block)) {
                return false;
            }
        }
        return true
    }

    replaceChain(newChain: Block[]) {
        if (newChain.length <= this.chain.length) {
            console.log('Recieve chain is not longer than current one')
            return
        } else if (!Blockchain.isValidChain(newChain)) {
            console.log('Recieve chain is not valid')
        } else {
            this.chain = newChain
        }
    }
}
