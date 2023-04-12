import React, { useState, useEffect } from'react';
import { socket } from '../socket';

export default function Pre ({ setGameState }) {
  const [availableUsers, setAvailableUsers] = useState([]);

  useEffect(() => {
    socket.on('connected-socket-users', (clients) => {
      setAvailableUsers(clients); //connected-socket-users returns clients as an array of objects containing socketID and username
    });

    return () => {
      socket.removeAllListeners('connected-socket-users');
    }
  }, [])

  function startGame() {
    socket.emit('start_game', (error) => {
      if (error) {
        console.log(error);
      }
      else{
        setGameState('active');
      }
    })
  }
    
  
  return (
    <div className='center-align'>
      <h1>Pre-Game</h1>
      <div>
        <button onClick={startGame} disabled={availableUsers.length === 0}>Start Game</button>
      </div>
      {availableUsers.length > 0 && (
      <div>
        <h4>Available users: </h4>
        <ul>
          {availableUsers.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>
      )}
    </div>
  )
}
