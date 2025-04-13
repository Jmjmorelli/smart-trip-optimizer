import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#ffffffd9',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Logo */}
      <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
      <img
        src="odysseylogo.png"
        alt="TripGo "
        style={{ height: '40px', objectFit: 'contain' }}
      />
    </div>


      {/* Search Bar */}
      <div style={{ flex: 1, margin: '0 2rem', display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search itineraries"
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '999px',
            border: '1px solid #ccc',
            width: '60%'
          }}
        />
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/Contact')}>Contact</button>
        <button onClick={() => navigate('/Login')}>Sign In</button>
        <button onClick={() => navigate('/Register')} style={{ backgroundColor: 'black', color: 'white' }}>Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
