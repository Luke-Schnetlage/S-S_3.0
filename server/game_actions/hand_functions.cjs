const { createClient } = require('@supabase/supabase-js') // Allows user to access Supabase DB
const supabase = createClient('https://fzlomsndqkamyrqjjzyb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs') // URL, API Key
const path = require('path')


async function draw (playerID, gameID, drawCount) {
  //it is assumed the default is drawing 1 card, but draw count can be sent to draw the specified number of cards
  try{
    drawCount = typeof drawCount === 'undefined' ? 1 : drawCount
    const cardremovedP =  remove_card_from_deck(playerID, gameID,drawCount)
    var cardremoved = await cardremovedP
    //console.log(`remove_card_from_deck ${JSON.stringify(cardremoved)} `)
    return await put_card_in_hand(playerID, gameID, cardremoved,drawCount) 
  } catch (error){
    console.log(error)
  }
}



async function remove_card_from_deck (playerID, gameID,drawCount) {
  // this assumes the deck is randomized, which it should be
  //console.log(`playerID ${playerID} `)
  //console.log(`gameID ${gameID} `)
  const { data, error } = await supabase
    .from('cards_in_deck')
    .delete()
    .match({ playerid: playerID, gameid: gameID })
    .order('card_space')
    .limit(drawCount)
    .select();
  if (error) {
    console.log(error)
    throw error
  }
  //console.log(`remove_card_from_deck ${JSON.stringify(data)} `)
  //return data
  //result = await put_card_in_hand(playerID, gameID, data[0].cardid)
  return data
}

async function put_card_in_hand (playerID, gameID, card, drawCount) {
  var cardinsert = []
  //console.log(card)
  for (i= 0; i < drawCount; i++){
    cardinsert.push({"playerid":playerID,"gameid":gameID,"cardid":card[i].cardid,card_type:card[i].card_type})  
  }
  const { data, error } = await supabase
    .from('hand')
    .insert(
      cardinsert
    )
    .select();
  //console.log(`put_card_in_hand data: ${JSON.stringify(data)}`);
  //console.log(`put_card_in_hand error: ${JSON.stringify(error)}`);
  if (error) {
    console.log(error)
  }
  //console.log(`put_card_in_hand ${JSON.stringify(data)} `)
  return data
}


async function discard (playerID, gameID,cardID) {
  // this assumes the deck is randomized, which it should be
  //console.log(`playerID ${playerID} `)
  //console.log(`gameID ${gameID} `)
  const { data, error } = await supabase
    .from('hand')
    .delete()
    .match({ playerid: playerID, gameid: gameID, cardid: cardID })
    .limit(1)
    .order('handid')
    .select();
  if (error) {
    console.log(error)
    throw error
  }
  //console.log(`remove_card_from_deck ${JSON.stringify(data)} `)
  //return data
  //result = await put_card_in_hand(playerID, gameID, data[0].cardid)
  return data
}


module.exports = {
  remove_card_from_deck,
  put_card_in_hand,
  draw,
  discard
}
