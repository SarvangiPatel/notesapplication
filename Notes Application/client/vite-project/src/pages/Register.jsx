import React from 'react';
import axios from 'axios';

const BASEURL = import.meta.env.VITE_BASEURL;



const Register = () => {
  const [formdata, setformdata] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const setdata = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formdata);
    axios.post(BASEURL + "user/register", formdata)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formdata.name}
            onChange={setdata}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formdata.email}
            onChange={setdata}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formdata.password}
            onChange={setdata}
          />
        </div>
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Register;
