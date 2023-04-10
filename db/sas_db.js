const { createClient } = require('@supabase/supabase-js') // Allows user to access Supabase DB
const { createHash } = require('crypto') // Allows to use crypto function for password
const supabase = createClient('https://fzlomsndqkamyrqjjzyb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs') // URL, API Key

/* Create table (IF NEEDED)

const createTable = async () => {
  let { data, error } = await supabase.rpc('create_table', {
    schema: 'public',
    name: 'my_table',
    columns: [
      { name: 'id', type: 'integer', primarykey: true },
      { name: 'name', type: 'text' }
    ]
  })

  if (error) {
    console.log('An error occurred:', error.message)
    return
  }

  console.log('Table created:', data)
}
createTable()
*/

/* Insert player info */
const insert = async () => {
  const hash = createHash('sha256').update('Carl_Winslow?').digest('hex')
  const { data = 'player', error } = await supabase.from('player').insert({
    username: 'Reginald_VelJohnson',
    password: hash
  })
  if (error) {
    console.log(error)
    return
  }
  console.log('Player inserted')
}
insert()

/* Select player info

const main = async () => {
  let { data = 'player', error} = await supabase.from('player').select('*')

  if (error) {
    console.log(error)
    return
  }
  console.log(data)
}
main()
*/

/* Delete table info

let { data, error } = await supabase.rpc('drop_table', {
    schema: 'public',
    table: 'my_table'
  })

  if (error) {
    console.log('An error occurred:', error.message)
    return
  }

  console.log('Table deleted:', data)
*/

/* Alter table info

let { data, error } = await supabase.rpc('alter_column', {
    schema: 'public',
    table: 'my_table',
    column: 'my_column',
    datatype: 'new_data_type',
    nullable: true,
    unique: false,
    default: null,
  })

  if (error) {
    console.log('An error occurred:', error.message)
    return
  }

  console.log('Column altered:', data)
*/
