import React, { useState, useEffect } from "react";
import axios from "axios";


function App() {

  //login states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState()
  const [loginStatus, setLoginStatus] = useState("")

  //registration states
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  //processes login request
  const handleSubmit = async e => {
    e.preventDefault();
    const user = { username, password };
    // send the username and password to the server
    console.log(user);
    const response = await axios.post(
      'https://SandS-replit-rebuild.luke-schnetlage.repl.co:3001/login',
      { user: user }
    );
    if (response.data.message) {
      setLoginStatus(response.data.message)
    } else {

      // set the state of the user
      setUser(response.data)
      console.log(`from submit: ${user}`)
      // store the user in localStorage
      localStorage.setItem('user', user.username)
      localStorage.setItem('pass', user.password)
      console.log(localStorage)
      //delete this line in final build
      console.log(`response data message${response.data}`)
    }
  };

  //function to send register info to backend to send to database
  const register = () => {
    axios.post('https://SandS-replit-rebuild.luke-schnetlage.repl.co:3001/register', {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      //grab the response from the backend
      console.log(response)
    })
  };

  //Checks if user has previously logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const loggedInPass = localStorage.getItem("pass");

    if (loggedInUser && loggedInPass) {
      const foundUser = {
        user: loggedInUser,
        pass: loggedInPass
      };
      setUser(foundUser);
    }
  }, []);

  //when user clicks logout
  const handleLogout = () => {
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
  };

  // if there's a user show the message below
  if (user) {
    return (
      <div className="center-align">
        Welcome back {localStorage.getItem("user")}
        <br />
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }

  // if there's no user, show the login form
  return (
    <div className="center-align">
      <div className="registration">
        <h2>Registration</h2>
        <label>Username: </label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <br />
        <label>Password: </label>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <br />
        <button onClick={register}>Register</button>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <h2>Log in</h2>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          value={username}
          placeholder="enter a username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div>
          <label htmlFor="password">password: </label>
          <input
            type="password"
            value={password}
            placeholder="enter a password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <br />
        {loginStatus}
      </form>
    </div>
  );
};

export default App;
