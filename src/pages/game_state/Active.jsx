import React, { useState, useEffect } from 'react';
import socket from '../../socket/socket.js';

export default function Active({ setGameState, gameID }) {
  const [deck, setDeck] = useState(0)
  const [opponentReady, setOpponentReady] = useState(false)
  console.log(`locally stored gameID: ${gameID}`)
  
  function selectDeck(deckID) {
    setDeck(deckID)
    socket.emit('deck_selected', deck, gameID)
  }
  socket.on('opponent_ready', () => {
    setOpponentReady(true)
  })

  if (!deck) {
    return (
      <div>
        <h2>Select Thy Deck</h2>
        <ul>
          <li><button onClick={() => selectDeck(1)}>Water</button></li>
          <li><button onClick={() => selectDeck(2)}>Fire</button></li>
          <li><button onClick={() => selectDeck(3)}>Wind</button></li>
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
    return (
      <h1>Let the game begin!</h1>
    )
  }
  return (
    <div className='center-align'>
      <h1>{deck}</h1>
    </div>
  )
}
