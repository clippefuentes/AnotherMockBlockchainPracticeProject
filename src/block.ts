import { ChainUtil } from './chainUtil';
import { DIFFICULTY, MINE_RATE } from './config';

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
        public data: string[],
        public nonce: number,
        public difficulty: number
    ) {
        this.timeStamp = timeStamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty || DIFFICULTY
    }

    toString(): string {
        return `
            Block -
            Timestamp: ${this.timeStamp}
            LastHash: ${this.lastHash.substring(0, 10)}
            Hash:   ${this.hash.substring(0, 10)}
            Data:   ${this.data}
            Nonce: ${this.nonce}
            Difficulty: ${this.difficulty}
        `
    }

    static genesis() {
        return new Block(
            new Date('1/1/2021').getTime(),
            '--------------------',
            '000000000000000000000',
            [],
            0,
            DIFFICULTY
        )
    }

    static mineBlock(lastBlock: Block, data: string[]) {
        let hash, timestamp
        let { difficulty } = lastBlock
        const lastHash = lastBlock.hash
        let nonce = 0

        do {
            nonce++
            timestamp = Date.now()
            difficulty = Block.adjustDifficulty(lastBlock, timestamp)
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty)
        } while(hash.substring(0, difficulty) !== '0'.repeat(difficulty))
       
        return new Block(timestamp, lastHash, hash, data, nonce, difficulty)
    }

    static hash(timestamp: number, lastHash: string, data: string[], nonce: number, difficulty: number) {
        return ChainUtil.hash(`${timestamp}${lastHash}${JSON.stringify(data)}${nonce}${difficulty}`).toString()
    }

    static blockHash(block: Block) {
        return Block.hash(block.timeStamp, block.lastHash, block.data, block.nonce, block.difficulty)
    }

    static adjustDifficulty(lastBlock: Block, currentTime: number): number {
        let { difficulty } = lastBlock
        difficulty = lastBlock.timeStamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1
        return difficulty
    }
}

