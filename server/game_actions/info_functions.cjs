const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://fzlomsndqkamyrqjjzyb.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function getfullgame (gameid) {
  try{
    const game = await getgame(gameid);
    //console.log(`game ${JSON.stringify(game)}`)
    const player1cardsPromise = getcardsindeck(game.start_playerid, gameid);
    const player2cardsPromise = getcardsindeck(game.join_playerid, gameid);
    const player1handPromise = getplayerhand(game.start_playerid, gameid);
    const player2handPromise = getplayerhand(game.join_playerid, gameid);
    const player1boardPromise = getplayerboard(game.start_playerid, gameid);
    const player2boardPromise = getplayerboard(game.join_playerid, gameid);
    const contestedzonePromise = getcontestedzone(gameid);
    
  
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

async function getcardsindeck (playerid, gameid) {
  const { data, error } = await supabase
    .from('cards_in_deck')
    .select('*')
    .match({ playerid, gameid })
  if (error) {
    console.log(error)
  }
  return data
}

async function getplayerhand (playerid, gameid) {
  const { data, error } = await supabase
    .from('hand')
    .select('*')
    .match({ playerid, gameid })
  if (error) {
    console.log(error)
  }
  return data
}

async function getplayerboard (playerid, gameid) {
  const { data, error } = await supabase
    .from('board')
    .select('*')
    .match({ playerid, gameid })
  if (error) {
    console.log(error)
  }
  return data
}

async function getcontestedzone (gameid) {
  const { data, error } = await supabase
    .from('contested_zone')
    .select('*')
    .match({ gameid })
  if (error) {
    console.log(error)
  }
  return data
}

async function getgame(gameid) {
  const { data, error } = await supabase
    .from('game')
    .select('*')
    .match({ gameid })
  if (error) {
    console.log(error)
  }
  return data[0]
}

async function getactiveterrain(playerid, gameid){
  const { data, error } = await supabase
    .from('board')
    .select('active_terrain')
    .match({ playerid: playerID, gameid: gameID })
  if (error) {
    console.log(error)
  }
  return data
}

async function getminion(minionid){
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
  getplayerboard,
  getcontestedzone,
  getcardsindeck,
  getplayerhand,
  getfullgame,
  getgame,
  getactiveterrain,
  getminion
}
