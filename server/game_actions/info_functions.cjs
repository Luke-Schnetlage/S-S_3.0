const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://fzlomsndqkamyrqjjzyb.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function getFullGame (gameid) {
  try{
    const game = await getGame(gameid);
    //console.log(`game ${JSON.stringify(game)}`)
    const player1cardsPromise = getCardsInDeck(game.start_playerid, gameid);
    const player2cardsPromise = getCardsInDeck(game.join_playerid, gameid);
    const player1handPromise = getPlayerHand(game.start_playerid, gameid);
    const player2handPromise = getPlayerHand(game.join_playerid, gameid);
    const player1boardPromise = getPlayerBoard(game.start_playerid, gameid);
    const player2boardPromise = getPlayerBoard(game.join_playerid, gameid);
    const contestedzonePromise = getContestedZones(gameid);
    
  
    const [player1cards, player2cards, player1hand, player2hand, player1board, player2board, contestedzone] = await Promise.all([player1cardsPromise, player2cardsPromise, player1handPromise, player2handPromise, player1boardPromise, player2boardPromise, contestedzonePromise])
    /*console.log(`player1cards ${JSON.stringify(player1cards)}`)
    console.log(`player2cards ${JSON.stringify(player2cards)}`)
    console.log(`player1hand ${JSON.stringify(player1hand)}`)
    console.log(`player2hand ${JSON.stringify(player2hand)}`)
    console.log(`player1board ${JSON.stringify(player1board)}`)
    console.log(`player2board ${JSON.stringify(player2board)}`)
    console.log(`contestedzone ${JSON.stringify(contestedzone)}`)*/
    return {
      player1cards,
      player2cards,
      player1hand,
      player2hand,
      player1board,
      player2board,
      contestedzone,
      game
    }
  } catch (error){
    throw error
  }
  
};

async function getCardsInDeck (playerid, gameid) {
  const { data, error } = await supabase
    .from('cards_in_deck')
    .select('*')
    .match({ playerid, gameid })
  if (error) {
    console.log(error)
  }
  return data
}

async function getPlayerHand (playerid, gameid) {
  const { data, error } = await supabase
    .from('hand')
    .select('*')
    .match({ playerid, gameid })
  if (error) {
    console.log(error)
  }
  return data
}

async function getPlayerBoard (playerid, gameid) {
  const { data, error } = await supabase
    .from('board')
    .select('*')
    .match({ playerid, gameid })
  if (error) {
    console.log(error)
  }
  return data
}

async function getContestedZones (gameid) {
  const { data, error } = await supabase
    .from('contested_zone')
    .select('*')
    .match({ gameid })
  if (error) {
    console.log(error)
  }
  return data
}

async function getGame(gameid) {
  const { data, error } = await supabase
    .from('game')
    .select('*')
    .match({ gameid })
  if (error) {
    console.log(error)
  }
  return data[0]
}

async function getActiveTerrain(playerid, gameid){
  const { data, error } = await supabase
    .from('board')
    .select('active_terrain')
    .match({ playerid: playerID, gameid: gameID })
  if (error) {
    console.log(error)
  }
  return data
}

async function getMinion(minionid){
  const { data, error } = await supabase
    .from('minion')
    .select('*')
    .match({ minionid })
  if (error) {
    console.log(error)
  }
  return data[0]
}


module.exports = {
  getPlayerBoard,
  getContestedZones,
  getCardsInDeck,
  getPlayerHand,
  getFullGame,
  getGame,
  getActiveTerrain,
  getMinion
}
