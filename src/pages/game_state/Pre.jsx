// in Pre.jsx

import React, { useState, useEffect } from 'react';
import socket from '../../socket/socket.js';

export default function Pre({ setGameState, availableUsers }) {
  console.log(`pre available users: ${availableUsers}`)

  function startGame(opponent) {
    if (!opponent) {
      console.log(`unsuccessful pass!`)
    }
    console.log(opponent)
    //socket.emit('start_game' <pass opponent to create a room>)
    //socket.on('game_created') <-- bad name
    //change gamestate to active

    /*
    socket.emit('start_game', (error) => {
      if (error) {
        console.log(error);
      }
      else {
        setGameState('active');
      }
    })
    */
  }

  return (
    <div className='center-align'>
      <h1>Available Users</h1>
      <div className='box'>
        <ul>
          {availableUsers.map(user => (
            <li key={user}>
              {user}&nbsp;
              <button onClick={() => startGame(user)}>Challenge Player</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}