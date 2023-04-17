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
const adapter = io.of("/").adapter;
const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://fzlomsndqkamyrqjjzyb.supabase.co'
const SUPABASE_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs`
//Luke's custom functions
const pregame = require((path.join(__dirname, 'pregame_actions/pregame.cjs')));
//res.sendFile(path.join(__dirname, '/build/index.html'))
app.use(express.static(path.join(__dirname, '/dist')))

//event listener for a client to make a connection
io.on("connection", (socket) => {
    //console.log(`User Connected: ${socket.id}`)
    socket.username = socket.handshake.headers["x-replit-user-name"]
    socket.userID = socket.handshake.headers["x-replit-user-id"]
    console.log(`${socket.username} | ${socket.userID}`);
    //on connection, return the username to establish authentication worked
    socket.emit("user_connection", socket.username);
    if(socket.username){
      pregame.createPlayer(socket.username,socket.userID)
    }
    socket.join("general");
    io.to("general").emit("connected-socket-users", pregame.getusers(io, socket));
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
        socket.emit("connected-socket-users", pregame.getusers(io, socket));
    });

    socket.on("disconnect", () => {
        socket.emit("connected-socket-users", pregame.getusers(io, socket));
    });    


});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});
