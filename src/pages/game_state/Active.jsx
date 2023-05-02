import React, { useState, useEffect } from 'react'
import socket from '../../socket/socket.js'
import Gameboard from './board/Board'

export default function Active({ setGameState, gameID, currentUser }) {
  const [deck, setDeck] = useState(0)
  const [opponentReady, setOpponentReady] = useState(false)


  function selectDeck(deckID) {
    console.log(`gameID: ${gameID}`)
    socket.emit('deck_selected', deckID, gameID)
    console.log('ready up emitted!')
    setDeck(deckID)
  }
  socket.on('opponent_ready', () => {
    console.log('opponent ready!')
    setOpponentReady(true)
  })

  if (!deck) {
    return (
      <div>
        <h2>Select Thy Deck</h2>
        <ul>
          <li><button className="button" onClick={() => selectDeck(2)}>Water</button></li>
          <li><button className="button" onClick={() => selectDeck(3)}>Fire</button></li>
          <li><button className="button" onClick={() => selectDeck(4)}>Wind</button></li>
        </ul>
      </div>
    )
  }
  if (deck && !opponentReady) {
    return (
      <div>
        Opponent is choosing deck.
      </div>
    )
  }
  if (deck && opponentReady) {
    socket.emit('both_players_ready', currentUser)
    return (
      <Gameboard
        gameID={gameID}
        currentUser={currentUser}
      />
    )
  }
  return (
    <div className='center-align' />
  )
}
