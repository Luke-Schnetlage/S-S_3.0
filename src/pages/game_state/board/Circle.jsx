import Slot from './Slot'
export default function Circle({ opponentCircle, gameID, currentUser, circle, cardAttempt, selectCard }) {
  if (opponentCircle) {
    return (
      <div>
        <div id='back-row'>
          <Slot
            slotType='invocation'
            opponentCircle={true}
          />
          <Slot
            slotType='invocation'
            opponentCircle={true}
          />
        </div>
        <div id='front-row'>
          <Slot
            slotType='minion'
            opponentCircle={true}
            cardPlaced={circle.minion3}
          />
          <Slot
            slotType='minion'
            opponentCircle={true}
            cardPlaced={circle.minion2}
          />
          <Slot
            slotType='minion'
            opponentCircle={true}
            cardPlaced={circle.minion1}
          />
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className='front-row'>
        <Slot
          slotType='minion'
          slotID='minion1'
          cardAttempt={cardAttempt}
          cardPlaced={circle.minion1}
          currentUser={currentUser}
          gameID={gameID}
          selectCard={selectCard}
        />
        <Slot 
          slotType='minion'
          slotID='minion2'
          cardAttempt={cardAttempt}
          cardPlaced={circle.minion2}
          currentUser={currentUser}
          gameID={gameID}
          selectCard={selectCard}
        />
        <Slot 
          slotType='minion'
          slotID='minion3'
          cardAttempt={cardAttempt}
          cardPlaced={circle.minion3}
          currentUser={currentUser}
          gameID={gameID}
          selectCard={selectCard}
          />
      </div>
      <div className='back-row'>
        <Slot 
          slotType='invocation'
          slotID='invocation1'
          currentUser={currentUser}
          gameID={gameID}
          selectCard={selectCard}
        />
        <Slot 
          slotType='invocation'
          slotID='invocation2'
          currentUser={currentUser}
          gameID={gameID}
          selectCard={selectCard}
        />
      </div>
    </div>
  )
}
