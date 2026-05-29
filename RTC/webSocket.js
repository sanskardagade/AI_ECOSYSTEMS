import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 3000 });

server.on("connection", (socket) => {
    console.log("Client connected");

    socket.send("Chai aur code web socket se");

    socket.on("message", (message) => {
        console.log(`Received message: ${message}`);

        socket.send(`Server received: ${message}`);
    });
});

console.log("WebSocket server running at ws://localhost:3000");