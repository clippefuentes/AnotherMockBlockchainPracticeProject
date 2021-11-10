import WebSocket, { Server, WebSocket as WebSocketInferface } from 'ws'
import { Blockchain } from './blockchain';

const P2P_PORT = process.env.P2P_PORT || 5001;

const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

console.log('peers:', peers)
export class P2PServer {
    blockchain: Blockchain;
    sockets: WebSocketInferface[];
    constructor(blockchain: Blockchain) {
        this.blockchain = blockchain
        this.sockets = []
    }

    listen() {
        let server: Server
        if (typeof P2P_PORT === 'string') {
            server = new WebSocket.Server({
                port: Number(P2P_PORT)
            })
        } else {
            server = new WebSocket.Server({
                port: P2P_PORT
            })
        }
        server.on('connection', (socket: WebSocketInferface) => this.connectSocket(socket))

        this.connectToPeers();
        console.log(`LISTEN FOR PEER TO PEER CONNECTION ON: ${P2P_PORT}`)
    }

    connectToPeers() {
        peers.forEach(peer => {
            console.log('peer:', peer)
            // const socket = new WebSocket(peer);
            // socket.on('open', () => this.connectSocket(socket))
        });
    }

    connectSocket(socket: WebSocketInferface) {
        this.sockets.push(socket)
        console.log('SOCKET CONNECTED')
    }
}