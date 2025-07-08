import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#f1f1f1',
      padding: '1rem',
      textAlign: 'center',
      marginTop: '2rem',
      fontSize: '14px',
      color: '#555'
    }}>
      © {new Date().getFullYear()} MyNoteApp. All rights reserved.
    </footer>
  );
};

export default Footer;
