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
  const [availableUsers, setAvailableUsers] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    socket.on('user_connection', (username) => {
      console.log(username)
      setCurrentUser(username);
      socket.emit('list_available_users')
    })
  })
  useEffect(() => {
    console.log(`awaiting user list. . .`)
    socket.on('connected-socket-users', (users) => {
      console.log(users)
      setAvailableUsers(users.map((users) => {
        return users.username
      console.log(`available useres from app ${availableUsers}`)
      }))
    })
  }, [])
  return (
    <div>
      <Navbar />
      <div id='page-container'>
        <div id='content-wrap'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/game' element={<Game availableUsers={availableUsers} setGameState={setGameState} />} />
            <Route path='/rules' element={<Rules />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;