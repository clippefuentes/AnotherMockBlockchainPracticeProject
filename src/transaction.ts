import { ChainUtil } from "./chainUtil";
import { Wallet } from "./wallet";

export class Transaction {
    id: string;
    input: null;
    outputs: any[];
    constructor() {
        this.id = ChainUtil.id()
        this.input = null
        this.outputs = []
    }

    static newTransaction(senderWallet: Wallet, recipient: string, amount: number) {
        const transaction = new Transaction()

        if (amount > senderWallet.balance) {
            console.log(`Amount: ${amount} exceeds balance`)
            return;
        }

        transaction.outputs.push(...[
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey },
            { amount, address: recipient }
        ])
        Transaction.signTransaction(transaction, senderWallet)
        return transaction
    }

    static signTransaction(transaction: any, senderWallet: Wallet) {
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
        }
    }
}