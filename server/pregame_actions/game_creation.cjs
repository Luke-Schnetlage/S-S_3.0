const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://fzlomsndqkamyrqjjzyb.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const path = require('path')
const hand_functions = require((path.join(__dirname, '../game_actions/hand_functions.cjs')))
const board_functions = require((path.join(__dirname, '../game_actions/board_functions.cjs')))

async function createGame (startPlayer, joinPlayer) {
  let activePlayer
  if (randomIntFromInterval(0, 1) == 0 ) {
    activePlayer = startPlayer
  } else {
    activePlayer = joinPlayer
  }

  const { data, error } = await supabase
    .from('game')
    .insert({
      start_playerid: startPlayer,
      join_playerid: joinPlayer,
      result: 2,
      active_player: activePlayer
    })
    .select()
  if (error) {
    console.log(error)
    return
  }
  await createBoard(startPlayer, data[0].gameid)
  await createBoard(joinPlayer, data[0].gameid)
  await createcontestedzone(data[0].gameid)
  await board_functions.placeterrain(activePlayer, data[0].gameid)
  return data[0]
}

async function createcontestedzone (gameid) {
  const { data, error } = await supabase
    .from('contested_zone')
    .insert({
      gameid
    })
  if (error) {
    console.log(error)
  }
  return data
}

async function getdecklist (decklistid) {
  // console.log('getdecklist run')
  // console.log(decklistid)
  const { data, error } = await supabase
    .from('deck_list')
    .select('*')
    .eq('deckid', decklistid)
    .select()
  if (error) {
    console.log(error)
  }
  //console.log(`decklist ${data}`)
  // console.log('#2')
  return data
}

function shuffle (sourceArray) {
  for (let i = 0; i < sourceArray.length - 1; i++) {
    const j = i + Math.floor(Math.random() * (sourceArray.length - i))
    const temp = sourceArray[j]
    sourceArray[j] = sourceArray[i]
    sourceArray[i] = temp
  }
  return sourceArray
}

async function translateDecklisttoCards_in_deck (decklistid, playerid, gameid) {
  return getdecklist(decklistid).then(decklist => {
    let cards_in_deck = []
    for (i = 0; i < decklist.length; i++) {
      for (j = 0; j < decklist[i].quantity; j++) {
        const card = { cardid: decklist[i].cardid, playerid, gameid, card_type: decklist[i].card_type }
        cards_in_deck.push(card)
      }
    }
    cards_in_deck = shuffle(cards_in_deck)
    return cards_in_deck
  })
}

async function populate_cards_in_deck (decklistid, playerid, gameid) {
  // console.log('populate_cards_in_deck run')
  // console.log(decklistid, playerid, gameid)
  deck = await translateDecklisttoCards_in_deck(decklistid, playerid, gameid)
  // console.log(deck)
  const { data, error } = await supabase
    .from('cards_in_deck')
    .insert(deck)
    .select()
  if (error) {
    console.log(error)
  }
  // console.log('#3')
  // console.log(data)
  // at begining of game, the player draws 5 cards
  await hand_functions.draw(playerid, gameid,5)
  // console.log('#4')
  // console.log(data)
  return data
}

async function createBoard (playerid, gameid) {
  const { data, error } = await supabase
    .from('board')
    .insert({
      playerid,
      gameid,
      spent_terrain : 0,
      health: 20,
      AFKwarnings: 0
    })
    .select()
  if (error) {
    console.log(error)
  }
  return data
}

function randomIntFromInterval (min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
  createGame,
  populate_cards_in_deck
}
