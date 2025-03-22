import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import TasksForm from './TasksForm';
import TasksItem from './TasksItem';
import "./TasksBlok.style.css";
import { useNavigate } from 'react-router-dom';

const TasksBlock = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const apiUrl = 'http://localhost:3000/tasks';
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks');
    }
  }, [token]); // Залежність від token

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); // Додаємо fetchTasks як залежність

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className='container'>
      <div className='header'>
        <h2>Tasks</h2>
        <button onClick={handleLogout} className='logoutButton'>
          Logout
        </button>
      </div>
      <TasksForm onAddTask={addTask} />
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <ul className='taskList'>
          {tasks.map((task) => (
            <TasksItem
              key={task.id}
              task={task}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />
          ))}
        </ul>
      )}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};



export default TasksBlock;