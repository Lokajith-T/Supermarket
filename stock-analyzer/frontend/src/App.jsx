import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import UserDashboard from './pages/user/UserDashboard';
import UserProfile from './pages/user/UserProfile';
import UserProducts from './pages/user/UserProducts';
import UserRequests from './pages/user/UserRequests';

const PrivateUserRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  return children;
};

const RootRedirect = () => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  return <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User Routes */}
          <Route path="/dashboard" element={<PrivateUserRoute><UserDashboard /></PrivateUserRoute>} />
          <Route path="/profile" element={<PrivateUserRoute><UserProfile /></PrivateUserRoute>} />
          <Route path="/products" element={<PrivateUserRoute><UserProducts /></PrivateUserRoute>} />
          <Route path="/requests" element={<PrivateUserRoute><UserRequests /></PrivateUserRoute>} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
