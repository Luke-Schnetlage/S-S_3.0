import Pre from './game_state/Pre'
import Active from './game_state/Active'
import Post from './game_state/Post'
import React, { useState } from 'react'

export default function Game({ availableUsers }) {
  console.log(`availableUsers from Game ${availableUsers}`)
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
            <Pre
              setGameState={setGameState}
              availableUsers={availableUsers}
            />
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
