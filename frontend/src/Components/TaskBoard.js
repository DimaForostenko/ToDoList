import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { fetchTasks, moveTask, updateTask } from '../redux/tasksSlice';
import { addActivity } from '../redux/activitySlice';
import TaskColumn from './TaskColumn';
import { useNavigate } from 'react-router-dom';
import './TaskBoard.style.css';

const TaskBoard = ({ onLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = parseInt(active.id); // active.id — це draggableId
    const newStatus = over.id; // over.id — це droppableId (назва колонки)

    if (['To Do', 'In Progress', 'Done'].includes(newStatus)) {
      const updatedTask = {
        status: newStatus,
        completed: newStatus === 'Done', // Для сумісності з бекендом
      };
      console.log('Updating task:', { taskId, updatedTask });
      dispatch(moveTask({ taskId, newStatus }));
      dispatch(updateTask({ id: taskId, task: updatedTask }));
      dispatch(addActivity(`Task ${taskId} moved to ${newStatus}`));
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const columns = {
    'To Do': tasks.filter((task) => task.status === 'To Do' || (!task.status && !task.completed)),
    'In Progress': tasks.filter((task) => task.status === 'In Progress'),
    'Done': tasks.filter((task) => task.status === 'Done' || task.completed === true),
  };

  return (
    <div className="taskboard-container">
      <div className="taskboard-header">
        <h2>Task Board</h2>
        <button onClick={handleLogout} className="taskboard-logout-button">
          Logout
        </button>
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p className="taskboard-error">{error}</p>}
      {status === 'succeeded' && (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="taskboard-board">
            {Object.entries(columns).map(([status, tasks]) => (
              <TaskColumn key={status} status={status} tasks={tasks} />
            ))}
          </div>
        </DndContext>
      )}
    </div>
  );
};

export default TaskBoard;