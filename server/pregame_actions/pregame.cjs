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

function getusers(io, socket) {
    const users = [];
    var clients = io.sockets;
    clients.sockets.forEach(function (data, counter) {
        users.push({
            userSocketID: data.id,
            username: data.username,
        });
        //socket.emit("connected-socket-users", users);
    })
    return users
}



module.exports = {
  createPlayer: createPlayer,
  getusers: getusers
}