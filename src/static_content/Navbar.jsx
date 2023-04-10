import { Link, useMatch, useResolvedPath } from 'react-router-dom'
export default function Navbar () {
  return (
    <nav className='nav'>
      <Link to='/' className='site-title'>Sellswords and Spellcrafts</Link>
      <ul>
        <li>
          <Link to='game'>Play</Link>
        </li>
        <li>
          <Link to='rules'>Rules</Link>
        </li>
      </ul>
    </nav>
  )
}
