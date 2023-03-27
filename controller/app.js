import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();

//parses every object sent from the frontend
app.use(express.json());
app.use(cors());

//database connection
const db = mysql.createConnection({
  user: "ntoweryo_luke_s",
  password: "lukeluke",
  host: "sv79.ifastnet.com",
  database: "ntoweryo_sellswords_and_spellcrafts",
})

//Route for registration
app.post('/register', (req, res) => {
  console.log('registering user');

  //grabbing information passed from frontend
  const username = req.body.username
  const password = req.body.password

  //registers new user into dataabse
  db.query(
    "INSERT INTO player (username, password) VALUES (?, ?)",

    //values to pass
    [username, password],

    //response from database
    (err, result) => {
      console.log(err);
    }
  );
})

//Route for login
app.post('/login', (req, res) => {

  //grabbing information passed from frontend
  const user = req.body.user;
  const { username } = user;
  const { password } = user;

  //logins users
  db.query(
    "SELECT * FROM player WHERE username = ? AND password = ?",

    //values to pass
    [username, password],

    //response from database
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      //if correct username and password combination
      if (result.length > 0) {
        res.send(result)
        console.log(result)
        //if incorrect username and password combination
      } else {
        res.send({ message: "Please enter a valid username and password combination!" })
      }

    }
  );
})
//uncomment 3001 for local testing
app.listen(3001, () => {
  console.log(`SERVER RUNNING`)
})