import http from 'http';

const server = http.createServer((req, res) => {
    if (req.url === '/poll') {
        setTimeout(() => {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                message: `Hello at ${new Date().toISOString()}`
            }));
        }, 2000);
    }else{
        res.writeHead(200);
        res.end("server is up and running")
    }
});

server.listen(3000,()=>{
    console.log("server is running at http://localhost:3000")
}) 