import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import TaskBoard from './Components/TaskBoard';
import ActivityLog from './Components/ActivityLog';
import ProtectedRoute from './Components/ProtectedRoute';
import './App.css'; // Import the CSS file

function App() {
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <h1>ToDo List</h1>
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <TaskBoard onLogout={handleLogout} />
                  <ActivityLog />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
