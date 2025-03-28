import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../redux/tasksSlice';
import { addActivity } from '../redux/activitySlice';
import { CSS } from '@dnd-kit/utilities';

const TaskItem = ({ task, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const dispatch = useDispatch();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: String(task.id),
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    ...styles.taskItem,
  };

  const handleUpdate = () => {
    dispatch(updateTask({ id: task.id, task: editedTask }));
    dispatch(addActivity(`Task ${task.id} updated`));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    dispatch(addActivity(`Task ${task.id} deleted`));
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div style={styles.dragHandle} {...listeners} {...attributes}>
        ⠿ {/* Іконка або символ для перетягування */}
      </div>
      {isEditing ? (
        <div style={styles.editContainer}>
          <input
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            style={styles.input}
          />
          <input
            value={editedTask.description || ''}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            style={styles.input}
          />
          <input
            type="date"
            value={editedTask.dueDate ? editedTask.dueDate.split('T')[0] : ''}
            onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
            style={styles.input}
          />
          <select
            value={editedTask.priority || 'middle'}
            onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
            style={styles.input}
          >
            <option value="low">Low</option>
            <option value="middle">Middle</option>
            <option value="high">High</option>
          </select>
          <button onClick={handleUpdate} style={styles.saveButton}>
            Save
          </button>
          <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>
            Cancel
          </button>
        </div>
      ) : (
        <div style={styles.taskContent}>
          <span>
            {task.title} - {task.description || 'No description'} <br />
            Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'} <br />
            Priority: {task.priority || 'middle'}
          </span>
          <div style={styles.buttonContainer}>
            <button onClick={() => setIsEditing(true)} style={styles.editButton}>
              Edit
            </button>
            <button onClick={handleDelete} style={styles.deleteButton}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  taskItem: {
    padding: '10px',
    margin: '5px 0',
    backgroundColor: '#fff',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
  },
  dragHandle: {
    width: '20px',
    height: '20px',
    cursor: 'grab',
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editContainer: {
    flex: 1,
  },
  input: {
    width: '100%',
    padding: '5px',
    margin: '5px 0',
  },
  buttonContainer: {
    display: 'flex',
    gap: '5px',
  },
  editButton: {
    padding: '5px',
    backgroundColor: '#ffc107',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '5px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '5px',
  },
};

export default TaskItem;