// in Pre.jsx

import React, { useState, useEffect } from 'react'
import socket from '../../socket/socket.js'

export default function Pre({ setGameState, availableUsers, currentUser }) {
  function startGame(currentUser, opponentID, opponentSocketID) {
    socket.emit('create_game', currentUser, opponentID, opponentSocketID)
    socket.on('game_created', () => {
      try {
        setGameState = 'active' // might be redundant
      } catch (error) {
        console.log(error)
      }
    })
  }

  return (
    <div className='center-align'>
      <h1>Players Online</h1>
      <div className='box'>
        <ul>
          {availableUsers.map(user => (
            <li key={user.usertID}>
              {user.username}&nbsp;
              <button className='button' onClick={() => startGame(currentUser, user.userID, user.socketID)}>Challenge</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
