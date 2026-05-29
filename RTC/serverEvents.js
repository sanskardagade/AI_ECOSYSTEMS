import http from 'http'

const server = http.createServer((req,res)=>{
    if(req.url === '/events'){
        res.writeHead(200,{
            'Content-Type':'text/event-stream',
            'Cache-Control':'no-cache',
            'Connection':'keep-alive'
        })
        const interval = setInterval(()=>{
            res.write(`data:${Date.now()}\n\n`)
        },2000)


        req.on('close',()=>{
            clearInterval(interval)
            res.end()
        })
    }else{
        res.writeHead(200)
        res.end('server is up')
    }
})


server.listen(3000,()=>{
    console.log('Server is running on http://localhost:3000')
})