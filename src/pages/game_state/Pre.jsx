// in Pre.jsx

import React, { useState, useEffect } from 'react';
import socket from '../../socket/socket.js';

export default function Pre({ setGameState, availableUsers, currentUser }) {
  function startGame(currentUser, opponentID, opponentSocketID) {
    if (!opponentID) {
      console.log(`unsuccessful pass!`)
    }
    console.log(`current user: ${currentUser}, other user: ${opponentID}`)
    socket.emit('create_game', currentUser, opponentID, opponentSocketID)
  }

  return (
    <div className='center-align'>
      <h1>Available Users</h1>
      <div className='box'>
        <ul>
          {availableUsers.map(user => (
            <li key={user.usertID}>
              {user.username}&nbsp;
              <button onClick={() => startGame(currentUser, user.userID, user.socketID)}>Challenge Player</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}