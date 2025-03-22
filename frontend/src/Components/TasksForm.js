import React, { useState } from 'react';
import axios from 'axios';
import "./TasksForm.style.css";

const TasksForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const apiUrl = 'http://localhost:3000/tasks';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        apiUrl,
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onAddTask(response.data);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to add task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Add Task
      </button>
      {error && <p style={styles.error}>{error}</p>}
    </form>
  );
};



export default TasksForm;