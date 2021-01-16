const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

const messages = [
    {message: "Hello", id: "23423", user: {id: "dfsfsd", name: "Dimych"}},
    {message: "Hi", id: "45345", user: {id: "asfda", name: "Vicktor"}}
]

io.on('connection', (socketChannel) => {
    socketChannel.on('client-message-sent', (message: string) => {
        console.log(message)
    })

    socketChannel.emit("init-messages-published", messages)

    console.log('a user connected')
})

const PORT = process.env.PORT || 3009

http.listen(PORT, () => {
    console.log('listening on *:3009')
})
