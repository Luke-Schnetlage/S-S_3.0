import React, { useState, useEffect } from 'react'
import socket from '../../socket/socket.js'

// This displays the post state of the game
// Button to go back to active game
// with a list of connect users
export default function Post({ setGameState }) {
  const [connectedUsers, setConnectedUsers] = useState([])

  // When the component is mounted, fetch the list of connected users
  // and update the state if changed.
  useEffect(() => {
    socket.emit('list_available_users') // emit users list

    socket.on('connected-socket-users', (data) => {
      setConnectedUsers(data)
    }) //

    return () => {
      socket.removeAllListeners('connected-socket-users') 
    } // remove all listeners from socket
  }, [])

  return (
    <div className='center-align'>
      <h1>Post-Game</h1>
      <div>
        <button onClick={() => setGameState('active')}>Retreat to Active</button>
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