import React, { useState } from 'react';

const StyledButton = ({ children, onClick, variant = "primary" }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    padding: '0.5rem 1.25rem',
    borderRadius: '999px',
    fontSize: '1rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isHovered ? '0 4px 10px rgba(0, 0, 0, 0.15)' : 'none',
  };

  const variants = {
    primary: {
      backgroundColor: '#000',
      color: '#fff',
    },
    secondary: {
      backgroundColor: '#fff',
      color: '#000',
      border: '1px solid #ccc',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#000',
    },
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...baseStyle,
        ...variants[variant],
      }}
    >
      {children}
    </button>
  );
};

export default StyledButton;
