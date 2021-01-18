const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:3000']
}));
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
const messages = [
    { message: "Hello", id: "23423", user: { id: "dfsfsd", name: "Dimych" } },
    { message: "Hi", id: "45345", user: { id: "asfda", name: "Vicktor" } }
];
io.on('connection', (socketChannel) => {
    socketChannel.on('client-message-sent', (message) => {
        let messageItem = {
            message: message, id: "12345" + new Date().getTime(),
            user: { id: "dfsfsd", name: "Dimych" }
        };
        messages.push(messageItem);
        io.emit('new-message-sent', messageItem);
    });
    socketChannel.emit('init-messages-published', messages);
    console.log('a user connected');
});
const PORT = process.env.PORT || 3009;
http.listen(PORT, () => {
    console.log('listening on *:3009');
});
//# sourceMappingURL=app.js.map