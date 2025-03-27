import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../redux/tasksSlice';
import { addActivity } from '../redux/activitySlice';
import "./TasksForm.style.css";

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description };
    dispatch(createTask(newTask));
    dispatch(addActivity(`Task "${title}" created`));
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="taskform">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="taskform-input"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="taskform-input"
      />
      <button type="submit" className="taskform-button">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;