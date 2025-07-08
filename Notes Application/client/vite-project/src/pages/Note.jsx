import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const BASEURL = import.meta.env.VITE_BASEURL;

const Note = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();


  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(BASEURL + "note/getall", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("API response:", response.data);
      setNotes(response.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error.response?.data || error.message);
    }
  };


  const DELETENOTES = async (_id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${BASEURL}note/delete/${_id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Note deleted successfully:", response.data);
      fetchNotes();
    } catch (error) {
      console.log("Error deleting note:", error.response?.data || error.message);
    }
  };



  useEffect(() => {
    fetchNotes();
  }, [location]);

  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '1rem 0' }}>All Notes</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem',
        padding: '1rem'
      }}>
        {Array.isArray(notes) ? (
          notes.map((note) => (
            <div key={note._id} style={{
              border: '1px solid #ccc',
              padding: '1rem',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}>
              <img
                src={note.noteimage}
                alt="Note"
                style={{
                  width: '100%',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => DELETENOTES(note._id)}>Delete</button>
              <button onClick={() => navigate(`/update/${note._id}`)}>Edit</button>

            </div>
          ))
        ) : (
          <p>Loading notes or no data found.</p>
        )}



      </div>
    </div>
  );
};

export default Note;
