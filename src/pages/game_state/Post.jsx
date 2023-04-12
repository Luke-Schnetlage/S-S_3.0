import React, { useState, useEffect } from 'react'
import socket from '../socket'

export default function Post({ setGameState }) {
  const [connectedUsers, setConnectedUsers] = useState([])

  useEffect(() => {
    socket.emit('list_available_users')

    socket.on('connected-socket-users', (clients) => {
      setConnectedUsers(clients)
    })

    return () => {
      socket.removeAllListeners('connected-socket-users')
    }
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