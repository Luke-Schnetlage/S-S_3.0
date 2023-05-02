const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = 'https://fzlomsndqkamyrqjjzyb.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const path = require('path')
const infoFunctions = require((path.join(__dirname, '/info_functions.cjs')))
const handFunctions = require((path.join(__dirname, '/hand_functions.cjs')))


async function start_turn(gameid, playerid){
  //at the start of turn, all a player's terrain becomes active, and the draw a card
  //on the back end, they become the active player
  //console.log(`start_turn begin`)
  //console.log(`gameid ${gameid}`)
  //console.log(`playerid ${playerid}`)
  const cardPromise = await handFunctions.draw(playerid, gameid)
  const terrainPromise = await resetterrain(gameid, playerid)
  const game = await infoFunctions.getgame(gameid)
  const { data, error } = await supabase
  .from('game')
  .update({active_player : playerid})
  .match({gameid: gameid })
  .select()
  if (error) {
    console.log(error)
  }
  //console.log(`start_turn ${JSON.stringify(data)}`)
  return data
}

async function resetterrain(gameid, playerid){
  infoFunctions.getplayerboard(playerid, gameid).then(async (board) => {
    //console.log(board[0].spent_terrain)
    //console.log(board[0].active_terrain)
    const { data, error } = await supabase
    .from('board')
    .update({spent_terrain: 0,
            active_terrain : (board[0].spent_terrain + board[0].active_terrain +1)})//a player gets 1 extra terrain each turn
    .match({ playerid: playerid, gameid: gameid })
    .select();
  if (error) {
    console.log(error)
  }
  return data
  }) 
}

module.exports = {
  start_turn
}