import { Link, useMatch, useResolvedPath } from 'react-router-dom'
export default function Navbar () {
  return (
    <nav className='nav'>
      <Link to='/'>
        <img src='nav_logo/sellswords_logo_final.png' alt='Logo' />
        <span className='site-title'>Sellswords and Spellcrafts</span>
      </Link>
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
