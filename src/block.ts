import { SHA256 } from 'crypto-js'

export interface BlockInterface {
    timestamp: number;
    lastHash: string;
    hash: string;
    data: string[]
}

export class Block {
    constructor(
        public timeStamp: number,
        public lastHash: string,
        public hash: string,
        public data: string[]
    ) {
        this.timeStamp = timeStamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
    }

    toString(): string {
        return `
            Block -
            Timestamp: ${this.timeStamp}
            LastHash: ${this.lastHash.substring(0, 10)}
            Hash:   ${this.hash.substring(0, 10)}
            Data:   ${this.data}
        `
    }

    static genesis() {
        return new Block(
            new Date('1/1/2021').getTime(),
            '--------------------',
            '000000000000000000000',
            []
        )
    }

    static mineBlock(lastBlock: Block, data: string[]) {
        const timestamp = Date.now()
        const lastHash = lastBlock.hash
        const hash = Block.hash(timestamp, lastHash, data)

        return new Block(timestamp, lastHash, hash, data)
    }

    static hash(timestamp: number, lastHash: string, data: string[]) {
        return SHA256(`${timestamp}${lastHash}${JSON.stringify(data)}`).toString()
    }

    static blockHash(block: Block) {
        return Block.hash(block.timeStamp, block.lastHash, block.data)
    }
}

