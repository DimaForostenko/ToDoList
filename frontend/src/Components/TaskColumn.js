import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import TaskItem from './TaskItem';
import './TaskColumn.style.css';

const TaskColumn = ({ status, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: status, // Унікальний ідентифікатор колонки
  });

  return (
    <div className="taskcolumn">
      <h3>{status}</h3>
      <div ref={setNodeRef} className="taskcolumn-tasklist">
        {tasks.map((task, index) => (
          <TaskItem key={task.id} task={task} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;