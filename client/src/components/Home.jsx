import React from 'react';

const Home = () => {
  return (
    <div style={{ padding: '80px 40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        Welcome to Smart Trip Optimizer
      </h1>

      <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>
        This is the Home Page.
      </p>

      <button
        style={{
          marginTop: '40px',
          backgroundColor: '#7f4fc3',
          color: '#fff',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
        onClick={() => alert('Button working!')}
      >
        Generate Itinerary
      </button>
    </div>
  );
};

export default Home;
