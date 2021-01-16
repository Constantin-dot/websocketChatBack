const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

io.on('connection', (socket) => {
    console.log('a user connected')
})

const PORT = process.env.PORT || 3009

http.listen(PORT, () => {
    console.log('listening on *:3009')
})
