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

  socket.on("send_message", (data) => {
    console.log(socket.id);
    console.log(data.message);

    //broadcast will emit to all other clients except the one that sent the data
    socket.broadcast.emit("receive_message", data)
  })
})

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
})


