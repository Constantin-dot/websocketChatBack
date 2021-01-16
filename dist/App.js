const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
io.on('connection', (socket) => {
    console.log('a user connected');
});
http.listen(3009, () => {
    console.log('listening on *:3009');
});
//# sourceMappingURL=App.js.map