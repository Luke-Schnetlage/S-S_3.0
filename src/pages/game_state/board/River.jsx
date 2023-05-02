import Slot from './Slot'

export default function River ({ player2, gameID, river, cardAttempt, currentUser }) {
  console.log(`player2 = ${player2}`)
  if(player2 == true){
    return(
      <div>
      <Slot 
        slotType='zone'
        slotID='zone3'
        cardAttempt={cardAttempt}
        cardPlaced={river.zone3_minid}
        gameID={gameID}
        currentUser={currentUser}
      />
      <Slot
        slotType='zone'
        slotID='zone2'
        cardAttempt={cardAttempt}
        cardPlaced={river.zone2_minid}
        gameID={gameID}
        currentUser={currentUser}
      />
      <Slot
        slotType='zone'
        slotID='zone1'
        cardAttempt={cardAttempt}
        cardPlaced={river.zone1_minid}
        gameID={gameID}
        currentUser={currentUser}
        />
    </div>  
    )
  }
  return (
    <div>
      <Slot 
        slotType='zone'
        slotID='zone1'
        cardAttempt={cardAttempt}
        cardPlaced={river.zone1_minid}
        gameID={gameID}
        currentUser={currentUser}
      />
      <Slot
        slotType='zone'
        slotID='zone2'
        cardAttempt={cardAttempt}
        cardPlaced={river.zone2_minid}
        gameID={gameID}
        currentUser={currentUser}
      />
      <Slot
        slotType='zone'
        slotID='zone3'
        cardAttempt={cardAttempt}
        cardPlaced={river.zone3_minid}
        gameID={gameID}
        currentUser={currentUser}
      />
    </div>
  )
}
