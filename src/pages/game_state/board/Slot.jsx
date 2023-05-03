/*import React, { useState, useEffect } from 'react'*/
import socket from '../../../socket/socket.js'
export default function Slot({ slotType, slotID, cardAttempt, cardPlaced, currentUser, gameID, opponentCircle, selectCard }) {
  
  function slotSelected() {
    if(opponentCircle){
      console.log(`Illegal card move! Cannot place a card in opponent's circle!`)
    } else if (!cardAttempt){
      console.log('select a card first!')
      console.log(`cardPlaced: ${cardPlaced}`)
    } else if (cardAttempt.card_type != slotType) {
      console.log(`Illegal card move! Card type ${cardAttempt.card_type} cannot be placed in ${slotType} slot.`)
    } else if (slotType == 'zone') {
      console.log(`ZONE currentUser: ${currentUser} gameID: ${gameID} cardAttempt: ${cardAttempt.cardid} slotID: ${slotID} card_slot: ${cardAttempt.card_slot}`)
      socket.emit('attack_zone', currentUser, gameID, cardAttempt.cardid, cardAttempt.card_slot, slotID)
    } else {
      console.log(`cardid: ${cardAttempt.cardid} | card_type: ${cardAttempt.card_type}`)
      console.log(`currentUser: ${currentUser} gameID: ${gameID} cardAttempt: ${cardAttempt.cardid} slotID: ${slotID} `)
      socket.emit('place_minion', currentUser, gameID, cardAttempt.cardid, slotID)
    }
   
  }



  return (
    <>
      {
        cardPlaced ? <button className={`slot card-${cardPlaced}`} onClick={() => {selectCard(cardPlaced, 'zone', slotID)}}>&nbsp;</button>
          : <button className='slot' onClick={() => { slotSelected() }}>{slotType}</button>
      }
    </>
  )
}
