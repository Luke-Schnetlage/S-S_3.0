import React, { useState, useEffect } from 'react';
import socket from '../../socket/socket.js';
//import { useHistory } from 'react-router-dom';

export default function Active({ setGameState }) {
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    socket.emit('list_available_users');

    socket.on('connected-socket-users', (clients) => {
      setConnectedUsers(clients);
    });

    return () => {
      socket.removeAllListeners('connected-socket-users');
    }
  }, [])

  return (
    <div className='center-align'>
      <h1>Active-Game</h1>
      <div>
        <button onClick={() => setGameState('post')}>Advance to Post</button>
      </div>
      <div>
        <button onClick={() => setGameState('pre')}>Retreat to Pre</button>
      </div>
      <div>
        <h4>Connected users: </h4>
        <ul>
          {connectedUsers.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
