import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASEURL = import.meta.env.VITE_BASEURL;

const Addnote = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        BASEURL + "note/create",
        formData, // send only title and content
        {
          withCredentials: true, // part of config
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      console.log('Note added:', response.data);
      alert("Note added successfully!");
      setFormData({ title: '', content: '' }); 
      navigate("/Note")
    } catch (error) {
      console.log('Error adding note:', error.response?.data || error.message);
      alert("Error adding note: " + (error.response?.data?.message || error.message));
    }
  };


  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: '300px', padding: '5px' }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Content:</label><br />
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="5"
            style={{ width: '300px', padding: '5px' }}
          ></textarea>
        </div>
        <button type="submit" style={{ marginTop: '10px', padding: '6px 12px' }}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
