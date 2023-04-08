const { createClient } = require('@supabase/supabase-js') // Allows user to access Supabase DB
const supabase = createClient('https://fzlomsndqkamyrqjjzyb.supabase.co', `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6bG9tc25kcWthbXlycWpqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk4Njg3MzIsImV4cCI6MTk5NTQ0NDczMn0.mjcd0jLLcFFvrQpO0tver9lgh_82CEFFBEaxGq1WaKs`) // URL, API Key


socket.io.on("connect", () => {
  // ...
});
