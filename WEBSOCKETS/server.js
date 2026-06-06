import http from 'http';
import {WebSocketServer} from 'ws';
import fs from 'node:fs/promises'
import path from 'path';

const PORT = process.env.PORT || 9000;

const httpServer = http.createServer(async function(req,res){
    const indexFile = await fs.readFile(path.resolve('./index.html'),'utf-8')
    res.setHeader('Content-Type','text/html')
    return res.end(indexFile)
});

const  wsServer = new WebSocketServer({server:httpServer})

wsServer.on('connection',(websocket)=>{
    console.log(`Websocket connection ...`)

    websocket.on('message',(data)=>{
        console.log(`Websocket Message Recv.`,data.toString())
        websocket.send('pong.. hello ji from server')
    })
})

httpServer.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})