import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BASEURL = import.meta.env.VITE_BASEURL; // Ensure this ends with '/'

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editdata, setEditdata] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const fetchNoteById = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(BASEURL + `note/get/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(id);
      console.log('Token:', token);
      console.log("Response from backend:", response.data);

      setEditdata({
        title: response.data.note.title,
        content: response.data.note.content,
      });

    } catch (error) {
      console.log("Fetch error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Error fetching note");
    }
  };

  useEffect(() => {
    fetchNoteById();
  }, [id]); // 👈 include `id` in deps just in case


  // Handle input changes
  const handleChange = (e) => {
    setEditdata({
      ...editdata,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setLoading(true);
    setError('');

    try {
      await axios.put(`${BASEURL}note/update/${id}`, editdata, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Note updated successfully.');
      navigate('/note'); // Redirect after update
    } catch (error) {
      setError(error.response?.data?.message || "Error updating note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Update Note</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            name="title"
            value={editdata.title}
            onChange={handleChange}
            required
            style={{ width: '300px', padding: '6px' }}
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <label>Content:</label><br />
          <textarea
            name="content"
            value={editdata.content}
            onChange={handleChange}
            required
            rows="5"
            style={{ width: '300px', padding: '6px' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '15px',
            padding: '8px 16px',
            backgroundColor: '#0d6efd',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Updating...' : 'Update Note'}
        </button>
      </form>
    </div>
  );
};

export default Update;
