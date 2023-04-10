import Pre from './game_state/Pre'
import Active from './game_state/Active'
import Post from './game_state/Post'
import React, { useState } from 'react'
import io from 'socket.io-client'

// socket connection to server
const socket = io.connect('https://SandS-replit-rebuild.luke-schnetlage.repl.co')

// function called when user makes initial connection
socket.on('user_connection', (username) => {
  console.log('user connection made!')

  if (!username) { // if the server returns no username
    console.log('please delete your browser cache and login')
  } else { // if the server returns a username, request list of active users in pre game
    console.log(`${username}`)
    socket.emit('list_available_users')
  }
})

socket.on('connected-socket-users', (clients) => { // receieve list of available user
  console.log('available_users received!')
  console.log(clients)
})

export default function Game() {
  const [gameState, setGameState] = useState('pre')
  let pre = false
  let active = false
  let post = false
  if (gameState === 'pre') {
    pre = true
    active = false
    post = false
  }

  if (gameState === 'active') {
    pre = false
    active = true
    post = false
  }

  if (gameState === 'post') {
    pre = false
    active = false
    post = true
  }

  return (
    <div className='center-align'>
      <>
        {
          pre ?
            <Pre setGameState={setGameState} />
            : (active ?
              <Active setGameState={setGameState} />
              : (post ?
                <Post setGameState={setGameState} />
                : <p>Please refresh your cache!</p>))
        }

      </>
    </div>
  )
}
