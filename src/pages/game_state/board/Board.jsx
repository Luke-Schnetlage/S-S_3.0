import React, { useState, useEffect } from 'react'
import socket from '../../../socket/socket.js'
import Circle from './Circle'
import River from './River'
export default function Gameboard({ gameID, currentUser }) {
  const [cardSelected, setCardSelected] = useState()
  const [myTurn, setMyTurn] = useState(false)
  const [player, setPlayer] = useState('')
  const [opponentID, setOpponentID] = useState()
  const [opponentCards, setOpponentCards] = useState()
  const [gameInfo, setGameInfo] = useState({
    contestedzone: [{
      zone1_minid: '',
      zone2_minid: '',
      zone3_minid: '',
    }],
    game: {
      active_player: '',
    },
    player1board: [{
      health: '',
      active_terrain: '',
      minion1: '',
      minion2: '',
      minion3: '',
    }],
    player2board: [{
      health: '',
      active_terrain: '',
      minion1: '',
      minion2: '',
      minion3: '',
    }],
    player1hand: [
      { cardid: '',
        card_type: '',},
      { cardid: '' },
      { cardid: '' },
      { cardid: '' },
      { cardid: '' },
      { cardid: '' },
    ],
    player2hand: [
      { cardid: '',
        card_type: '',},
      { cardid: '' },
      { cardid: '' },
      { cardid: '' },
      { cardid: '' },
      { cardid: '' },
    ],
    player1cards: 'awaiting',
    player2cards: 'awaiting',
  })

  useEffect(() => {
    socket.on('game_info', (receivedGameInfo) => {
      console.log("from board.jsx")
      setCardSelected()
      setGameInfo(receivedGameInfo)
      if (currentUser == receivedGameInfo.game.active_player) {
        setMyTurn(true)
      } else {
        setMyTurn(false)
      }
      console.log(`game info received!`)
      console.log(receivedGameInfo)

      if (currentUser == receivedGameInfo.player2board[0].playerid) {
        setPlayer('player2')
        setOpponentID(receivedGameInfo.player1board[0].playerid)
        setOpponentCards(receivedGameInfo.player1hand.length)
      } else {
        setPlayer('player1')
        setOpponentID(receivedGameInfo.player2board[0].playerid)
        setOpponentCards(receivedGameInfo.player2hand.length)
      }
    })
  }, [socket, gameID])

  useEffect(() => {
    socket.emit('get_game', gameID)
  }, [socket, gameID])

  function endTurn(gameID, opponentID) {
    if (myTurn) { //check so that user cannot spam
      setMyTurn(false)
      console.log(`turn ended!`)
      socket.emit('end_turn', gameID, opponentID, currentUser)
    } else {
      console.log(`it is not your turn!`)
    }
  }

  function selectCard(cardid, card_type, card_slot) {
    if (!myTurn) {
      console.log(`it is not your turn!`)
    } else {

      console.log(cardid)
      console.log(card_type)
      setCardSelected({
        cardid: cardid,
        card_type: card_type,
        card_slot: card_slot
      })
      console.log(cardSelected)
    }
  }

  if (player == 'player2') {
    console.log('player = player2')
    return (
      <div className='p2__board'>
        <div className='center-align'>
          <div className='p2__opp-label'>Opponent Stats</div>
          <div className='p2__opp-stats'>
            <div>{gameInfo.player1board[0].health} HP</div>
            <div>{opponentCards} cards in hand</div>
            <div>{gameInfo.player1board[0].active_terrain} Terrain</div>
          </div>
          <Circle opponentCircle circle={gameInfo.player1board[0]}/>
          <River 
            player2={true}
            gameID={gameID}
            river={gameInfo.contestedzone[0]}
            cardAttempt={cardSelected}
            currentUser={currentUser}
          />
          <Circle 
            cardAttempt={cardSelected}
            gameID={gameID}
            currentUser={currentUser}
            circle={gameInfo.player2board[0]}
            selectCard={selectCard}
            />
          <div className='p2__stats-label'>Your Stats:</div>
          <div className='p2__stats'>
              <div>{gameInfo.player2board[0].active_terrain} Terrain</div>
              <div>{gameInfo.player2board[0].health} HP</div>
              {myTurn ?
                <div>Your Turn</div>
                : (
                  <div>Opponent Turn</div>
                )}
              <button className="button" onClick={() => { endTurn(gameID, opponentID) }}>End Turn</button>
            </div>
          </div>
        <div className='card-container'>
            {gameInfo.player2hand.map(hand => (
              <button onClick={() => { selectCard(hand.cardid, hand.card_type, 'hand') }} className={`card card-${hand.cardid}`}>{hand.cardid}</button>
            ))}&nbsp;
        </div>
      </div>
    )
  }

  if (player == 'player1') {
    console.log(`player = player1`)
    return (
      <div className='p1__board'>
        <div className='center-align'>
          <div className='p1__opp-stats'>
            <div>{gameInfo.player2board[0].health} HP</div>
            <div>{opponentCards} cards in hand</div>
            <div>{gameInfo.player2board[0].active_terrain} Terrain</div>
          </div>
          <Circle opponentCircle circle={gameInfo.player2board[0]} />
          <River 
            player2={false}
            gameID={gameID}
            river={gameInfo.contestedzone[0]}
            cardAttempt={cardSelected} 
            currentUser={currentUser}
          />
          <Circle
            cardAttempt={cardSelected}
            gameID={gameID}
            currentUser={currentUser}
           circle={gameInfo.player1board[0]}
            selectCard={selectCard}
            />
          <div className='p1__stats'>
            <div>{gameInfo.player1board[0].active_terrain} Terrain</div>
            <div>{gameInfo.player1board[0].health} HP</div>
            {myTurn ?
              <div>Your Turn</div>
              : (
                <div>Opponent Turn</div>
              )}
            <button className="button" onClick={() => { endTurn(gameID, opponentID) }}>End Turn</button>
          </div>
          <div className='card-container'>
            {gameInfo.player1hand.map(hand => (
              <button onClick={() => { selectCard(hand.cardid, hand.card_type, 'hand') }} className={`card card-${hand.cardid}`}>{hand.cardid}</button>
            ))}&nbsp;
          </div>
        </div>
      </div>
    )
  }
  return (
    <h1>Loading. . .</h1>
  )
}