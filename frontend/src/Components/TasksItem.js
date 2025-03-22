import React, { useState } from 'react';
import axios from 'axios';
import "./TasksItem.style.css";

const TasksItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const token = localStorage.getItem('token');
  const apiUrl = `http://localhost:3000/tasks/${task.id}`;

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(apiUrl, editedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdateTask(response.data);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update task', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDeleteTask(task.id);
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleToggleComplete = async () => {
    const updatedTask = { ...editedTask, completed: !editedTask.completed };
    try {
      const response = await axios.patch(apiUrl, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdateTask(response.data);
      setEditedTask(response.data);
    } catch (err) {
      console.error('Failed to toggle task completion', err);
    }
  };

  return (
    <li className='taskItem'>
      {isEditing ? (
        <div className='editContainer'>
          <input
            type="checkbox"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className='checkbox'
          />
          <input
            type="text"
            value={editedTask.description || ''}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className='input'
          />
          <button onClick={handleUpdate} className='saveButton'>
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className='cancelButton'>
            Cancel
          </button>
        </div>
      ) : (
        <div className='taskContent'>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleComplete}
            className="checkbox" 
          />
          <span className={task.completed ? "completed" :"" }>
            {task.title} - {task.description || 'No description'}
          </span>
          <div>
            <button onClick={() => setIsEditing(true)} className='editButton'>
              Edit
            </button>
            <button onClick={handleDelete} className='deleteButton'>
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};



export default TasksItem;