import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCategories from './pages/admin/AdminCategories';
import AdminProducts from './pages/admin/AdminProducts';
import AdminStock from './pages/admin/AdminStock';
import AdminRequests from './pages/admin/AdminRequests';
import AdminUsers from './pages/admin/AdminUsers';
import AdminBilling from './pages/admin/AdminBilling';
import AdminBillingLogs from './pages/admin/AdminBillingLogs';
import AdminStockLogs from './pages/admin/AdminStockLogs';

const PrivateAdminRoute = ({ children }) => {
  const { currentUser, userRole } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  if (userRole !== 'admin') return <div>Access Denied. You are not an admin.</div>;
  return children;
};

const RootRedirect = () => {
  const { currentUser, userRole } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  if (userRole === 'admin') return <Navigate to="/dashboard" />;
  return <div>Access Denied. You are not an admin.</div>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={<PrivateAdminRoute><AdminDashboard /></PrivateAdminRoute>} />
          <Route path="/categories" element={<PrivateAdminRoute><AdminCategories /></PrivateAdminRoute>} />
          <Route path="/products" element={<PrivateAdminRoute><AdminProducts /></PrivateAdminRoute>} />
          <Route path="/stock" element={<PrivateAdminRoute><AdminStock /></PrivateAdminRoute>} />
          <Route path="/requests" element={<PrivateAdminRoute><AdminRequests /></PrivateAdminRoute>} />
          <Route path="/users" element={<PrivateAdminRoute><AdminUsers /></PrivateAdminRoute>} />
          <Route path="/billing" element={<PrivateAdminRoute><AdminBilling /></PrivateAdminRoute>} />
          <Route path="/billing-logs" element={<PrivateAdminRoute><AdminBillingLogs /></PrivateAdminRoute>} />
          <Route path="/stock-logs" element={<PrivateAdminRoute><AdminStockLogs /></PrivateAdminRoute>} />
          
          {/* Catch all for admin portal */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
