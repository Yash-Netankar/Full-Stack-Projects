const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});
const express = require("express");
app.use(express.json());

const port = process.env.PORT || 3001;

const users = {}
let list_of_users = [];

io.on('connection', socket => {
    // user joined
    socket.on('new_user_joined', name => {
        users[socket.id] = name;
        list_of_users.push(name);
        io.emit('list_of_users', list_of_users);
        socket.broadcast.emit('user_joined', name);
    });

    // user sending messages
    socket.on('send', msg => {
        socket.broadcast.emit('receive', { msg: msg, name: users[socket.id] });
    });

    // user typing
    socket.on("typing", data => {
        socket.broadcast.emit("typing", { msg: `${data.name} is typing...` });
    });

    // private message
    socket.on('pvt_msg', data => {
        let index = Object.values(users).indexOf(data.pvt_uname);
        let value = Object.values(users)[index];
        let key = Object.keys(users).find(key => users[key] === value);
        socket.to(key).emit("pvt_msg_emit", { msg: data.msg, name: users[socket.id] });
    })

    // user left
    socket.on('disconnect', () => {
        socket.broadcast.emit('left', { name: users[socket.id] });
        list_of_users = list_of_users.filter(user => user !== users[socket.id]);
        io.emit('list_of_users', list_of_users);
        delete users[socket.id];
    });
});



http.listen(port, () => console.log("Runing", port));