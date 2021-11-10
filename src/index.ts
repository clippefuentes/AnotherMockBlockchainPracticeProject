import express from 'express'
import bodyParser from 'body-parser'
import { Blockchain } from './blockchain';
import { P2PServer } from './p2pServer';

const HTTP_PORT = process.env.HTTP_PORT || 3001;

// set HTTP_PORT=3001 && set P2P_PORT=5002 && set PEERS=ws://localhost:5011&&npm run start:dev
const app = express()
const bc = new Blockchain()
const p2pServer = new P2PServer(bc)

app.use(bodyParser.json())

app.get('/blocks', (req: any, res: any) => {
    // @ts-ignore
    res.json(bc.chain)
})

app.post('/mine', (req: any, res: any) => {
    const block = bc.addBlock(req.body.data)
    console.log(`NEW BLOCK ADDED: ${block.toString()}`)
    p2pServer.syncChains()
    res.redirect('/blocks')
})

app.listen(HTTP_PORT, () => console.log(`Listen on port ${HTTP_PORT}`))
p2pServer.listen()