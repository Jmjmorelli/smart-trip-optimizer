import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const containerStyle = {
    backgroundImage: "url('/images/landing.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  const overlayStyle = {
    backgroundColor: '#333',
    padding: '40px',
    borderRadius: '10px',
    color: '#fff',
    textAlign: 'center',
  };

  const headlineStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1rem',
  };

  const subheadStyle = {
    fontSize: '1.25rem',
    marginBottom: '1.5rem',
  };

  const buttonStyle = {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#000',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <h1 style={headlineStyle}>Where to next?</h1>
        <p style={subheadStyle}>create the perfect itinerary here</p>
        <button
          style={buttonStyle}
          onClick={() => navigate('/home')} // navigate to homepage
          onMouseEnter={(e) => (e.target.style.background = '#f0f0f0')}
          onMouseLeave={(e) => (e.target.style.background = '#fff')}
        >
          Plan Trip
        </button>
      </div>
    </div>
  );
};

export default Landing;
