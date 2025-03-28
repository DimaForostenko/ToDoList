import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../redux/tasksSlice';
import { addActivity } from '../redux/activitySlice';
import "./TasksForm.style.css";

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'low', // За замовчуванням "low"
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description };
    dispatch(createTask(newTask));
    dispatch(addActivity(`Task "${title}" created`));
    setTask({ title: '', description: '', dueDate: '', priority: 'low' });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="taskform">
      <input
        type="text"
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
        className="taskform-input"
      />
      <input
        type="text"
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="taskform-input"
      />
      <input
        type="date"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        className="taskform-input"
      />
      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
        className="taskform-input"
      >
        <option value="low">Low</option>
        <option value="middle">Middle</option>
        <option value="high">High</option>
      </select>
      <button type="submit" className="taskform-button">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;