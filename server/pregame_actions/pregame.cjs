const { createClient } = require('@supabase/supabase-js') // Allows user to access Supabase DB
const supabase = createClient('https://fzlomsndqkamyrqjjzyb.supabase.co', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs`) // URL, API Key

const createPlayer = async (username, password) => {
  const hash = createHash('sha256').update(password).digest('hex')
  let {data = 'player', error} = await supabase.from('player')
    .insert({
      username: username,
      password: hash
  });
  if(error) {
    console.log(error);
    return;
  }
  //console.log('Player inserted');
}



const createGame = async (startPlayer, joinPlayer) => {

  let {data, error} = await supabase
    .from('game')
    .insert({
      start_playerid: startPlayer,
      join_playerid: joinPlayer,
      result : 2
  });
  if(error) {
    console.log(error);
    return;
  }
//  console.log('Game created');
}
//createGame('5','16');