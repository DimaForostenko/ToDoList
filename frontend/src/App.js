import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import TasksBlock from './Components/TasksBlock';
import ProtectedRoute from './Components/ProtectedRoute';
import "./App.css"; 
 
function App() {
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className='app'>
        <h1>ToDo List</h1>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TasksBlock onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;