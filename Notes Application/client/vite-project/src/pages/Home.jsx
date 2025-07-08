import React from 'react';

const Home = () => {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      minHeight: '80vh'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#333' }}>Welcome to MyNoteApp 📝</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '1rem' }}>
        Create, view, and manage your personal notes securely and efficiently.
      </p>
      <p style={{ fontSize: '1rem', color: '#777', marginTop: '2rem' }}>
        Click on "Add Note" to start or view your saved notes.
      </p>
    </div>
  );
};

export default Home;
