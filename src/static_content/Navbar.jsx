import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  const [open, setOpen] = useState(false);

  const handleBurgerClick = () => {
    setOpen(!open);
  };

  return (
    <nav className='nav'>
      <Link to='/'>
        <span className='site-title'>Sellswords and Spellcrafts</span>
      </Link>
      <div className='burger' onClick={handleBurgerClick}>
        <svg viewBox=' 0 0 100 80' width='40' height='40'>
          <rect width='100' height='15' rx='8'></rect>
          <rect y='30' width='100' height='15' rx='8'></rect>
          <rect y='60' width='100' height='15' rx='8'></rect>
        </svg>
      </div>
      <ul className={`menu ${open ? 'show' : ''}`}>
        <li>
          <Link to='/game'>Play</Link>
        </li>
        <li>
          <Link to='/rules'>Rules</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;