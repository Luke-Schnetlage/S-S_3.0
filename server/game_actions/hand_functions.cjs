const { createClient } = require('@supabase/supabase-js') // Allows user to access Supabase DB
const supabase = createClient('https://fzlomsndqkamyrqjjzyb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs') // URL, API Key
// This ALL needs to be rewritten asynchronously
/*

function draw(playerID, gameID) {
card = select_random_card_from_deck(playerID, gameID)
card_space = card.card_space
cardid = card.cardid
remove_card_from_deck(card_space)
//add code to find a players handID and insert the card into their hand table
handID = //get_hand_id(gameID, playerID)
put_card_in_hand(playerID, gameID, cardid ,handID)
}

function select_random_card_from_deck(playerID, gameID){
const { data, error } = await supabase
  .from('cards_in_deck')
  .select('card_space, cardid')
  .match({ playerid: playerID, gameid: gameID })
  .limit(1)
  .is('card_space', NOT NULL)

 if (error) {
    console.log(error)
    return
  }
  return data
}

function remove_card_from_deck(card_space) {
  const { data, error } = await supabase
    .from('table_name')
    .delete(card_space)
  if (error) {
    console.log(error)
    return
  }
return data
}

function put_card_in_hand(playerID, gameID, cardID,handID) {
  const insert = async () => {
  let {data = 'player', error} = await supabase
    .from('hand')
    .insert({
    handid: handID,
    cardid: cardID,
    playerid: playerID,
    gameid: gameID
  });
  if(error) {
    console.log(error);
    return;
  }
  console.log('Card Drawn');
}
insert();
}
*/
/*
function get_hand_id(gameID, playerID){
  const main = async () => {
  let { data = 'player', error} = await supabase
    .from('hand')
    .select('handid')

  if (error) {
    console.log(error)
    return
  }
  console.log(data)
}
main()
} */
