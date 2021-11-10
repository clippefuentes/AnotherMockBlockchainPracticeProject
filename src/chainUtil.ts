import { ec as EC } from 'elliptic'
import { v1 } from 'uuid'
import { SHA256 } from 'crypto-js'

const ec = new EC('secp256k1');

export class ChainUtil {
    static getKeyPair() {
        return ec.genKeyPair();
    }
    
    static id() {
        return v1()
    }

    static hash(data: string) {
        return SHA256(JSON.stringify(data)).toString()
    }
}