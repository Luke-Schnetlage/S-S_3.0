import { Route, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import socket from './socket/socket.js';

// CSS
import './styles/fonts.css'
import './styles/main.css'

// relative HTML
import Navbar from './static_content/Navbar';
import Game from './pages/Game';
import Home from './pages/Home';
import Rules from './pages/Rules';
import Footer from './static_content/Footer';

function App() {
  const [gameState, setGameState] = useState('pre');
  const [availableUsers, setAvailableUsers] = useState('{}');
  const [currentUser, setCurrentUser] = useState('');
  const [gameID, setGameID] = useState('')
  //when the current client connects to server
  useEffect(() => {
    socket.on('user_connection', (userID) => {
      console.log(userID)
      setCurrentUser(userID)
        console.log(`currentUser${currentUser}`)
      socket.emit('list_available_users')
    })
  }, [currentUser])

  //grabs user list of general room everytime a client maes a connection
  useEffect(() => {
    console.log(`awaiting user list. . .`)
    socket.on('connected-socket-users', (users) => {
      setAvailableUsers(users)
    })
  }, [availableUsers])

  //pulls current client out of general room and places them into a private room when another client challenges them
  useEffect(() =>{
    console.log(`awaiting challenge. . .`)
    socket.on('game_request', (opponent) =>{
      console.log('game_request acknowledged')
      socket.emit('join_game', opponent)
    })
  })

  useEffect(() =>{
    socket.on('game_joined', (newGame) => {
      console.log('game has been joined')
      setGameID(newGame)
      console.log(`raw gameID: ${newGame}`)
      setGameState('active')
    })
  })
  
  return (
    <div>
      <Navbar />
      <div id='page-container'>
        <div id='content-wrap'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/game' element={<Game availableUsers={availableUsers} gameState={gameState} currentUser={currentUser} gameID={gameID} />} />
            <Route path='/rules' element={<Rules />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;