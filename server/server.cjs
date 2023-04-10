const { getUserInfo } = require("@replit/repl-auth")
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors")
const path = require('path')
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
    cors: {
        origin: "https://socket-io-test.nicolastowery.repl.co",
        methods: ["GET", "POST"],
    }
});
const adapter = io.of("/").adapter;//new
//res.sendFile(path.join(__dirname, '/build/index.html'))
app.use(express.static(path.join(__dirname, '/dist')))

//event listener for a client to make a connection
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)
    socket.username = socket.handshake.headers["x-replit-user-name"]
    socket.userID = socket.handshake.headers["x-replit-user-id"]
    console.log(`${socket.username} | ${socket.userID}`);
    //on connection, return the username to establish authentication worked
    socket.emit("user_connection", socket.username);
    //console.log("test statment #1");

    const users = [];
    var clients = io.sockets.sockets;
    var count = 0;
    clients.forEach(function (data) {
        count++;
        console.log(`User ${count}: ${data.id}`)
        users.push(data)
    });

    //emitter.socketsJoin("default");
    /*
    io.of("/").adapter.on("create-room", (room) => {
      console.log(`room ${room} was created`);
    });
  
    io.of("/").adapter.on("join-room", (room, id) => {
      console.log(`socket ${id} has joined room ${room}`);
    });
    */
    socket.on("list_available_users", function (data, counter) {
        const users = [];
        var clients = io.sockets;
        clients.sockets.forEach(function (data, counter) {
            users.push({
                userSocketID: data.id,
                username: data.username,
            });
            socket.emit("connected-socket-users", users);
        })
      
        socket.on("disconect", () => {
            const users = [];
            var clients = io.sockets;
            clients.sockets.forEach(function (data, counter) {
                users.push({
                    userSocketID: data.id,
                    username: data.username,
                });
                socket.emit("connected-socket-users", users);
            })

        });
      /*
        setInterval(function () {
            socket.emit("connected-socket-users", users);
        }, 10000);
      */

    });
});
//event listenesr for a client to make a disconnect from the server
/*
setInterval(function(socket){
socket.emit("connected-socket-users", users);
}, 3000);
*/

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});


