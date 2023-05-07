const { getUserInfo } = require('@replit/repl-auth')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const path = require('path')
const server = http.createServer(app)
app.use(cors())
const io = new Server(server, {
  cors: {
    origin: 'https://socket-io-test.nicolastowery.repl.co',
    methods: ['GET', 'POST']
  }
})
const adapter = io.of('/').adapter
const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://fzlomsndqkamyrqjjzyb.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
// Luke's custom functions
const pregame = require((path.join(__dirname, 'pregame_actions/pregame.cjs')))
const gameCreation = require((path.join(__dirname, 'pregame_actions/game_creation.cjs')))
const infoFunctions = require((path.join(__dirname, 'game_actions/info_functions.cjs')))
const handFunctions = require((path.join(__dirname, 'game_actions/hand_functions.cjs')))
const turnFunctions = require((path.join(__dirname, 'game_actions/turn_functions.cjs')))
const boardFunctions = require((path.join(__dirname, 'game_actions/board_functions.cjs')))
app.use(express.static(path.join(__dirname, '/dist')))

app.get('*', (req, res) => {
  res.statusCode = 302;
  res.setHeader("Location", "https://sands-replit-rebuild.luke-schnetlage.repl.co");
  res.end();
});


// event listener for a client to make a connection
io.on('connection', (socket) => {
// console.log(`User Connected: ${socket.id}`)
  socket.username = socket.handshake.headers['x-replit-user-name']
  socket.userID = socket.handshake.headers['x-replit-user-id']
  console.log(`${socket.username} | ${socket.userID}`)
  // on connection, return the username to establish authentication worked
  socket.emit('user_connection', socket.userID)
  if (socket.username) {
    pregame.createPlayer(socket.username, socket.userID)
  }
  socket.join('general')
  io.to('general').emit('connected-socket-users', pregame.getUsers(io, socket))

  socket.on('list_available_users', function (data, counter) {
    socket.emit('connected-socket-users', pregame.getUsers(io, socket))
  })

  socket.on('create_game', (startPlayerid, joinPlayerid, joinplayersocketID) => {
    gameCreation.createGame(startPlayerid, joinPlayerid).then(game => {
      io.to(joinplayersocketID).emit('game_request', startPlayerid, game.gameid)
      socket.leave('general')
      socket.join(game.gameid)
    })
  })

  socket.on('join_game', (startPlayerid, gameid) => {
    socket.to(gameid).emit('game_created')
    socket.leave('general')
    socket.join(gameid)
    io.to(gameid).emit('game_joined', gameid)
  })

  socket.on('deck_selected', (decklistid, gameid) => {
    gameCreation.populateCardsInDeck(decklistid, socket.userID, gameid).then(data => {
      socket.to(gameid).emit('opponent_ready')
    })
  })

  socket.on('get_game', async (gameid) => {
    await new Promise(r => {setTimeout(r, 750)});
    infoFunctions.getFullGame(gameid).then((data) => {
      //console.log(`full game success ${(socket.userID)}`)
      socket.to(gameid).emit('game_info', data)
    }).catch((error) => {
      //console.log(`full game error ${JSON.stringify(error)}`)
      //socket.to(gameid).emit('game_info_error', error)
    })
  })

  socket.on('place_minion', (playerid, gameid, minionid, zoneid) => {
    //console.log(`server catch`)
    //console.log(`playerid ${playerid}`)
    //console.log(`gameid ${gameid}`)
    //console.log(`minionid ${minionid}`)
    //console.log(`zoneid ${zoneid}`)
    boardFunctions.placeMinion(playerid, gameid, minionid, zoneid).then(result => {
      infoFunctions.getFullGame(gameid).then((data) => {
      //console.log(`full game success ${(socket.userID)}`)
        io.to(gameid).emit('game_info', data)
      })
    })
  })

  socket.on('both_players_ready', (playerid,gameid) => {
  })

  socket.on('attack_zone', async (attackingplayerid,gameid,attackingminionid,homezone,targetzone) => {
    //console.log(`attackingplayerid ${attackingplayerid}`)
    //console.log(`gameid ${gameid}`)
    //console.log(`attackingminionid ${attackingminionid}`)
    //console.log(`homezone ${homezone}`)
    //console.log(`targetzone ${targetzone}`)
            
    await boardFunctions.attackZone(attackingplayerid,gameid,attackingminionid,homezone,targetzone)
    infoFunctions.getFullGame(gameid).then((data) => {
      //console.log(`full game success ${(socket.userID)}`)
        io.to(gameid).emit('game_info', data)
    })
  
  })

  
  socket.on('end_turn', async (gameid,opponentid,turnplayerid) => {
    //console.log(`gameid ${JSON.stringify(gameid)}`)
    //console.log(`opponentid ${JSON.stringify(opponentid)}`)
    //console.log(`turnplayerid ${JSON.stringify(turnplayerid)}`)
    await turnFunctions.startTurn(gameid, opponentid)
    data = await infoFunctions.getFullGame(gameid)
    //console.log(`end_turn game ${JSON.stringify(data)}`)
    io.to(gameid).emit('game_info', data)
    //socket.to(turnplayerid).emit('game_info', data)
    //socket.to(opponentid).emit('game_info', data)
  })

  
  socket.on('disconnect', () => {
    io.emit('connected-socket-users', pregame.getUsers(io, socket))
  })
})

server.listen(3001, () => {
  console.log('SERVER IS RUNNING')
})

