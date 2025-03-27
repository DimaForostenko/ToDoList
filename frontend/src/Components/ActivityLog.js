import React from 'react';
import { useSelector } from 'react-redux';
import './ActivityLog.style.css'; // Import the CSS file

const ActivityLog = () => {
  const logs = useSelector((state) => state.activity.logs);

  return (
    <div className="activitylog-container">
      <h3>Activity Log</h3>
      <ul className="activitylog-list">
        {logs.map((log) => (
          <li key={log.id} className="activitylog-item">
            {log.timestamp} - {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;