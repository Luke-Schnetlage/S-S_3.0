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
//res.sendFile(path.join(__dirname, '/build/index.html'))
app.use(express.static(path.join(__dirname, '/dist')))

//event listener for a client to make a connection
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`)
  username = socket.handshake.headers["x-replit-user-name"]
  userID = socket.handshake.headers["x-replit-user-id"]
  console.log(`${username} | ${userID}`);
  //on connection, return the username to establish authentication worked
  socket.emit("user_connection",username);

  
  const users = [];
  var clients = io.sockets.sockets;
  var count = 0;
  clients.forEach(function(data){
    count++;
    console.log(`User ${count}: ${data.id}`)
  });
/*
  socket.on("join", function(room, username){
    if (username != ""){
      rooms[socket.id] = room;
      usernames[socket.id] = username;
      socket.leaveAll();
      socket.join(room);
      io.in(room).emit("recieve", "Server : " + username + " has entered the chat.");
      socket.emit("join", room);
    }
  })
*/
  
});
//event listenesr for a client to make a disconnect from the server


server.listen(3002, () => {
  console.log("SERVER IS RUNNING");
});


