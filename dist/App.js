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
    socketChannel.on('client-message-sent', (message) => {
        if (typeof message !== "string") {
            return;
        }
        const user = usersState.get(socketChannel);
        let messageItem = {
            message: message, id: "12345" + new Date().getTime(),
            user: { id: user.id, name: user.name }
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