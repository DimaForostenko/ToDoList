import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./RegisterForm.style.css";

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        username,
        password,
      });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token); // Зберігаємо токен
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 2000); // Перенаправлення через 2 секунди
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className='container'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div className='inputGroup'>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='input'
          />
        </div>
        <div className='inputGroup'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='input'
          />
        </div>
        <button type="submit" className='button'>
          Register
        </button>
      </form>
      <button
        onClick={() => navigate('/login')}
        className='switchButton'
      >
        Go to Login
      </button>
      {success && <p className='success'>{success}</p>}
      {error && <p className='error'>{error}</p>}
    </div>
  );
};


export default RegisterForm;