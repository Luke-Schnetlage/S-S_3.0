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
const gameCreation = require((path.join(__dirname, 'pregame_actions/game_creation.cjs')));
//res.sendFile(path.join(__dirname, '/build/index.html'))
app.use(express.static(path.join(__dirname, '/dist')))


//event listener for a client to make a connection
io.on("connection", (socket) => {
    //console.log(`User Connected: ${socket.id}`)
    var games = []
    socket.username = socket.handshake.headers["x-replit-user-name"]
    socket.userID = socket.handshake.headers["x-replit-user-id"]
    console.log(`${socket.username} | ${socket.userID}`);
    //on connection, return the username to establish authentication worked
    socket.emit("user_connection", socket.userID);
    if(socket.username){
      pregame.createPlayer(socket.username,socket.userID)
    }
    socket.join("general");
    io.to("general").emit("connected-socket-users", pregame.getusers(io, socket));
   
    socket.on("list_available_users", function (data, counter) {
        socket.emit("connected-socket-users", pregame.getusers(io, socket));
    });

    socket.on("create_game", (startPlayerid, joinPlayerid, joinplayersocketID) => {
      gameCreation.createGame(startPlayerid, joinPlayerid).then( game => {
        //console.log("#1 game =")
        //console.log(game)
        games[game.gameid] = game
        //console.log("#2 game =")
        //console.log(games[game.gameid])
        io.to(joinplayersocketID).emit("game_request", startPlayerid)
        socket.leave("general")
        socket.join(game.gameid)  
      });
    });
                                                      
    socket.on("join_game", (startPlayerid,gameid) => { 
      console.log("#3 gameid =")
      console.log(gameid)
      console.log("#4 game =")
      console.log(games[gameid])
      socket.emit("game_created", games[gameid]); 
      socket.leave("general") 
      socket.join(gameid) 
      
      io.to(gameid).emit("game_joined", gameid)
    });


    socket.on("deck_selected", (decklistid,gameid) => { 
      console.log("line 64: gameid =")
      console.log(gameid)
      socket.to(games[gameid].gameid).emit("opponent_ready", gameCreation.populate_cards_in_deck(decklistid,socket.userID,gameid))
    }); 

  
    socket.on("disconnect", () => {
        socket.emit("connected-socket-users", pregame.getusers(io, socket));
    });    


});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});
