import Redis from './redis';
let onlineUsers = {};
module.exports = (http) => {
    const io = require('socket.io')(http);

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);
        socket.on('disconnect', () => {
            console.log('user disconnected');
            for (let user in onlineUsers) {
                if (onlineUsers[user].socketId === socket) {
                    delete onlineUsers[user];
                }
            }
        });
        socket.on('start', (data) => {
            console.log(data, 'data');

            // Redis.storeSocketId(data.id, socket.id);
            onlineUsers[data.userId] = {
                data: data,
                socketId: socket.id
            };
            console.log(onlineUsers, 'onlineUsers');
        });
    });

    module.exports = {
        io,
        onlineUsers
    };

};