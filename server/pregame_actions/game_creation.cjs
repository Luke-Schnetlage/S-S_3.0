const { createClient } = require('@supabase/supabase-js') // Allows user to access Supabase DB
const supabase = createClient('https://fzlomsndqkamyrqjjzyb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs') // URL, API Key


async function createGame(startPlayer, joinPlayer){
  const { data, error } = await supabase
    .from('game')
    .insert({
      start_playerid: startPlayer,
      join_playerid: joinPlayer,
      result: 2
    })
  if (error) {
    console.log(error)
  } else {
    return data[0]
  }
}


async function getdecklist(decklistid){
  const { data, error } = await supabase
    .from('deck_list')
    .select('*')
    .eq('deckid',decklistid);
  if (error) {
    console.log(error)
  } 
  return data
}



function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}


async function translateDecklisttoCards_in_deck(decklistid,playerid,gameid){
  return getdecklist(decklistid).then(decklist => {
    var cards_in_deck = []
    
    for (i = 0 ; i < decklist.length;i++){
      //console.log(decklist[i])
      for (j = 0; j < decklist[i].quantity; j++){
        var card = {cardid: decklist[i].cardid,playerid: playerid,gameid: gameid}
        
        cards_in_deck.push(card)

      }
    }
    cards_in_deck = shuffle(cards_in_deck)
    return cards_in_deck
  })
}

async function populate_cards_in_deck(decklistid,playerid,gameid){
  translateDecklisttoCards_in_deck(decklistid,playerid,gameid).then(async function(deck) {
    console.log(deck.slice(0,-1))
    const { data, error } = await supabase
      .from('cards_in_deck')
      .insert(deck)
      //.insert(deck.slice(0,-1).slice(0,-1));
    if (error) {
      console.log(error)
    }
    
  })

}


module.exports = {
  createGame: createGame,
  populate_cards_in_deck : populate_cards_in_deck
}