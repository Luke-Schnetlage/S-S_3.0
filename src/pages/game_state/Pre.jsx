// in Pre.jsx

import React, { useState, useEffect } from 'react';
import socket from '../../socket/socket.js';

export default function Pre({ setGameState, availableUsers, currentUser }) {
  console.log(`availableUser type: ${typeof availableUser}`)
  console.log(`pre current user: ${currentUser}`)

  function startGame(currentUser, opponent) {
    if (!opponent) {
      console.log(`unsuccessful pass!`)
    }
    
    console.log(opponent)
    socket.emit('create_game', currentUser, opponent)
    socket.on('game_created', () => {
      console.log('game created!')
    })
  }

  return (
    <div className='center-align'>
      <h1>Available Users</h1>
      <div className='box'>
        <ul>
          {availableUsers.map(user => (
            <li key={user.usertID}>
              {user.username}&nbsp;
              <button onClick={() => startGame(currentUser, user.userID)}>Challenge Player</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}