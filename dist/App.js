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
const messages = [];
const usersState = new Map();
io.on('connection', (socketChannel) => {
    usersState.set(socketChannel, { id: new Date().getTime().toString(), name: "anonymous" });
    io.on('disconnect', () => {
        usersState.delete(socketChannel);
    });
    socketChannel.on('client-name-sent', (name) => {
        if (typeof name !== "string") {
            return;
        }
        const user = usersState.get(socketChannel);
        user.name = name;
    });
    socketChannel.on('client-typed', () => {
        socketChannel.broadcast.emit('user-is-typing', usersState.get(socketChannel));
    });
    socketChannel.on('client-message-sent', (message, successFn) => {
        if (typeof message !== "string" || message.length > 300) {
            successFn("Message length should be less than 20 chars");
            return;
        }
        const user = usersState.get(socketChannel);
        let messageItem = {
            message: message, id: "12345" + new Date().getTime(),
            user: { id: user.id, name: user.name }
        };
        messages.push(messageItem);
        io.emit('new-message-sent', messageItem);
        successFn(null);
    });
    socketChannel.emit('init-messages-published', messages, (data) => {
        console.log('Init messages received:' + data);
    });
    console.log('a user connected');
});
const PORT = process.env.PORT || 3009;
http.listen(PORT, () => {
    console.log('listening on *:3009');
});
//# sourceMappingURL=app.js.map