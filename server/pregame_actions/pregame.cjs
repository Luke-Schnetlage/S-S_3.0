const { createClient } = require('@supabase/supabase-js') // Allows user to access Supabase DB
const supabase = createClient('https://fzlomsndqkamyrqjjzyb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs') // URL, API Key

async function createPlayer(username, id) {
  const { data = 'player', error } = await supabase.from('player')
    .insert({
      userid : id,
      username: username
    })
  if (error) {
    console.log(error)
  }
  // console.log('Player inserted');
}

async function  createGame(startPlayer, joinPlayer){
  const { data, error } = await supabase
    .from('game')
    .insert({
      start_playerid: startPlayer,
      join_playerid: joinPlayer,
      result: 2
    })
  if (error) {
    console.log(error)
  }
//  console.log('Game created');
}
// createGame('5','16');

module.exports = {
  createPlayer: createPlayer,
  createGame: createGame
}