import { Route, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import socket from './socket/socket.js'

// CSS
import './styles/fonts.css'
import './styles/main.css'
import './App.css'

// relative HTML
import Navbar from './static_content/Navbar'
import Game from './pages/Game'
import Home from './pages/Home'
import Rules from './pages/Rules'
import Footer from './static_content/Footer'

function App() {
  const [gameState, setGameState] = useState('pre')
  const [availableUsers, setAvailableUsers] = useState('{}')
  const [currentUser, setCurrentUser] = useState()
  const [gameID, setGameID] = useState('')
  const [game, setGame] = useState('{}')
  // when the current client connects to server
  useEffect(() => {
    socket.on('user_connection', (userID) => {
      setCurrentUser(Number(userID))
      socket.emit('list_available_users')
    })
  }, [])

  // grabs user list of general room everytime a client maes a connection
  useEffect(() => {
    socket.on('connected-socket-users', (users) => {
      setAvailableUsers(users)
    })
  },)

  // pulls current client out of general room and places them into a private room when another client challenges them
  useEffect(() => {
    socket.on('game_request', (opponent, gameID) => {
      socket.emit('join_game', opponent, gameID)
    })
  })

  useEffect(() => {
    socket.on('game_joined', (newGame) => {
      setGameID(newGame)
      setGameState('active')
    })
  })
/*
  useEffect(() => {
    socket.on('game_info', (gameInfo) => {
      console.log('from App.jsx')
      console.log(gameInfo)
      setGame(gameInfo)
    })
  }, [socket])
*/
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
  )
}

export default App
