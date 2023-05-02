import React, { useState } from 'react';
import { getUserInfo, logout } from "@replit/repl-auth"; // Import getUserInfo and logout

function Login() {
  const [loggedIn, setLoggedIn] = useState(false); // Keep track of login status

  const handleLogin = async () => {
    console.log('handleLogin called');
    try {
      const response = await fetch('https://repl.it/login?goto=')
      const html = await response.text()

      const formRegex = /<form.*?action="(.*?)".*?>/gis
      const csrfRegex = /<input.*?name="csrf_token".*?value="(.*?)".*?>/gis

      const formMatch = formRegex.exec(html)
      const csrfMatch = csrfRegex.exec(html)

      if (formMatch && csrfMatch) {
        const [, actionUrl] = formMatch
        const [, csrfToken] = csrfMatch

        const { email, password } = getUserInfo() // Get current user's email and password
        const formData = new FormData()
        formData.set('csrf_token', csrfToken)
        formData.set('email', email) // Use retrieved email instead of placeholder
        formData.set('password', password) // Use retrieved password instead of placeholder

        const authResponse = await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          redirect: 'manual'
        })

        if (authResponse.ok) {
          setLoggedIn(true); // Update login status
          window.location.replace('/') // Redirect to your app's home page after successful authentication
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    logout(); // Call logout function to log out user
    setLoggedIn(false); // Update login status
  }

  return (
    <div>
      {loggedIn ? (
        <div>
          <h3>{getUserInfo().email} is logged in</h3>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <div>
          <h1>Login to Play Sellswords and Spellcrafts</h1>
          <button onClick={handleLogin}>Log In</button>
        </div>
      )}
    </div>
  )
}

export default Login;