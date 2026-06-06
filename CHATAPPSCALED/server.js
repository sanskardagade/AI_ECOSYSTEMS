import http from 'http';
import { WebSocketServer } from 'ws';
import fs from 'node:fs/promises';
import path from 'node:path';
import { redisPublish,redisSubscribe } from './connection.js';

const PORT = process.env.PORT || 9000;
const REDIS_CHANNEL = 'ws-messages'

const httpServer = http.createServer(async (req, res) => {
    try {
        const html = await fs.readFile(
            path.resolve('./index.html'),
            'utf-8'
        );

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end(html);
    } catch (error) {
        console.error(error);

        res.writeHead(500);
        res.end('Failed to load index.html');
    }
});

const wsServer = new WebSocketServer({
    server: httpServer
});

redisSubscribe.subscribe(REDIS_CHANNEL)
redisSubscribe.on('message',(channel,message)=>{
    //Broadcast messages to  all of your connected clients
    if(channel===REDIS_CHANNEL){
        wsServer.clients.forEach((client)=>{
            client.send(message.toString())
        })
    }
})

wsServer.on('connection', (websocket) => {
    console.log('Client Connected');

    websocket.on('message', async(data) => {
        console.log(`Websocket message received`,data.toString())

        //RELAY THE MESSAGE TO BROKER
        console.log(`Relaying message to the redis broker`)
        await redisPublish.publish( REDIS_CHANNEL,data.toString())

    });

    websocket.on('close', () => {
        console.log('Client Disconnected');
    });

    websocket.on('error', (error) => {
        console.error('WebSocket Error:', error);
    });
});

httpServer.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});


//bash
//export PORT=9000 && node server.js
