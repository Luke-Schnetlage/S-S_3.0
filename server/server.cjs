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

    socket.join("general");
    io.to("general").emit("connected-socket-users", getusers(io, socket));
    /*  
    const users = [];
      var clients = io.sockets.sockets;
      var count = 0;
      clients.forEach(function (data) {
          count++;
          console.log(`User ${count}: ${data.id}`)
          users.push(data)
      });
  */
    socket.on("list_available_users", function (data, counter) {
        socket.emit("connected-socket-users", getusers(io, socket));
    });

    socket.on("disconect", () => {
        socket.emit("connected-socket-users", getusers(io, socket));
    });    

    /*
    io.of("/").adapter.on("create-room", (room) => {
      console.log(`room ${room} was created`);
    });
    io.of("/").adapter.on("join-room", (room, id) => {
      console.log(`socket ${id} has joined room ${room}`);
    });
    */

});


server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});


function getusers(io, socket) {
    const users = [];
    var clients = io.sockets;
    clients.sockets.forEach(function (data, counter) {
        users.push({
            userSocketID: data.id,
            username: data.username,
        });
        //socket.emit("connected-socket-users", users);
    })
    return users
}