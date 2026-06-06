import http from 'http';
import { WebSocketServer } from 'ws';
import fs from 'node:fs/promises';
import path from 'node:path';

const PORT = process.env.PORT || 9000;

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

wsServer.on('connection', (websocket) => {
    console.log('Client Connected');

    websocket.on('message', (data) => {
        try {
            const message = JSON.parse(data.toString());

            console.log('Message Received:', message);

            // Broadcast to every connected client
            wsServer.clients.forEach((client) => {
                if (client.readyState === 1) {
                    client.send(
                        JSON.stringify({
                            type: message.type,
                            text: message.text
                        })
                    );
                }
            });
        } catch (error) {
            console.error('Invalid Message:', error);
        }
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
