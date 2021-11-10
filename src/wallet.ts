import { INITIAL_BALANCE } from "./config";
import { ChainUtil } from "./chainUtil";

export class Wallet {
    public balance: number
    public keyPair: any
    public publicKey: any
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.getKeyPair()
        this.publicKey = this.publicKey.getPublic().encode('hex')
    }

    toString() {
        return `
            Wallet -
            publicKey: ${this.publicKey.toString()}
            balance: ${this.balance}
        `
    }

    sign(dataHash: string) {
        return this.keyPair.sign(dataHash)
    }
}