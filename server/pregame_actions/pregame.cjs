const { createClient } = require('@supabase/supabase-js') // Allows user to access Supabase DB
const supabase = createClient('https://fzlomsndqkamyrqjjzyb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs') // URL, API Key

async function createPlayer (username, id) {
  const { data = 'player', error } = await supabase.from('player')
    .insert({
      userid: id,
      username
    })
    .select()
  if (error) {
    // console.log(error)
  }
  // console.log('Player inserted');
  return data
}

function getusers (io, socket) {
  const users = []
  const clients = io.sockets
  clients.sockets.forEach(function (data, counter) {
    users.push({
      userID: data.userID,
      username: data.username,
      socketID: data.id
    })
    // socket.emit("connected-socket-users", users);
  })
  return users
}

module.exports = {
  createPlayer,
  getusers
}
