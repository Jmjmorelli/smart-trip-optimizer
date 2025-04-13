import React from 'react';
import { useNavigate } from 'react-router-dom';
import StyledButton from './StyledButton'; // make sure the path matches where you saved the file

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
        src="/images/odyssey_logo_trans.png"
        alt="Odyssey Logo"
        style={{
          height: '55px',
        objectFit: 'contain',
  }}
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
        <StyledButton
          onClick={() => window.open("https://youtube.com", "_blank")}
          variant="ghost"
        >
          Contact
        </StyledButton>

        <StyledButton
          onClick={() => navigate('/Login')}
          variant="secondary"
        >
          Sign In
        </StyledButton>

        <StyledButton
          onClick={() => navigate('/Register')}
          variant="primary"
        >
          Register
        </StyledButton>
      </div>
    </nav>
  );
};

export default Navbar;
