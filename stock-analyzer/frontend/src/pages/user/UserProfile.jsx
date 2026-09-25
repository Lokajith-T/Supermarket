import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { database } from '../../firebase';
import { ref, get, update } from 'firebase/database';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { FiUser, FiMail, FiPhone, FiLock, FiCalendar } from 'react-icons/fi';

export default function UserProfile() {
  const { currentUser } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    mobile: '',
    createdAt: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (currentUser?.uid) {
      const userRef = ref(database, 'users/' + currentUser.uid);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setProfileData({
            name: data.name || currentUser.displayName || '',
            email: currentUser.email || '',
            mobile: data.mobile || '',
            createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : 'Unknown'
          });
        }
      });
    }
  }, [currentUser]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const updates = {};
      updates[`/users/${currentUser.uid}/name`] = profileData.name;
      updates[`/users/${currentUser.uid}/mobile`] = profileData.mobile;
      
      // Update Realtime DB
      await update(ref(database), updates);

      // Update Firebase Auth Profile (Display Name)
      if (profileData.name !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName: profileData.name });
      }

      // Update Email if changed
      if (profileData.email !== currentUser.email) {
        await updateEmail(currentUser, profileData.email);
        updates[`/users/${currentUser.uid}/email`] = profileData.email;
        await update(ref(database), updates);
      }

      setMessage({ text: 'Profile updated successfully!', type: 'success' });
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage({ text: 'Failed to update profile. ' + error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return setMessage({ text: 'Passwords do not match!', type: 'error' });
    }
    if (passwordData.newPassword.length < 6) {
      return setMessage({ text: 'Password must be at least 6 characters.', type: 'error' });
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await updatePassword(currentUser, passwordData.newPassword);
      setMessage({ text: 'Password changed successfully!', type: 'success' });
      setPasswordData({ newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error("Password update error:", error);
      // If user hasn't logged in recently, Firebase requires re-authentication.
      setMessage({ text: 'Failed to update password. You may need to log out and log back in to verify your identity.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Sidebar role="user" />
      
      <div className="main-content">
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>My Profile</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your personal information and account security.</p>
        </header>

        {message.text && (
          <div style={{ padding: '16px', marginBottom: '24px', borderRadius: '8px', background: message.type === 'success' ? 'rgba(72, 94, 48, 0.1)' : 'rgba(140, 67, 81, 0.1)', color: message.type === 'success' ? 'var(--success)' : 'var(--danger)', border: `1px solid ${message.type === 'success' ? 'var(--success)' : 'var(--danger)'}` }}>
            {message.text}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          {/* Profile Details Form */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiUser /> Personal Information
            </h2>
            
            <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label className="label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <FiUser style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
                  <input type="text" className="input-field" style={{ paddingLeft: '44px' }} value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} required />
                </div>
              </div>

              <div>
                <label className="label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <FiMail style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
                  <input type="email" className="input-field" style={{ paddingLeft: '44px' }} value={profileData.email} onChange={e => setProfileData({...profileData, email: e.target.value})} required />
                </div>
              </div>

              <div>
                <label className="label">Mobile Number</label>
                <div style={{ position: 'relative' }}>
                  <FiPhone style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
                  <input type="tel" className="input-field" style={{ paddingLeft: '44px' }} value={profileData.mobile} onChange={e => setProfileData({...profileData, mobile: e.target.value})} required />
                </div>
              </div>

              <div style={{ marginTop: '8px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <FiCalendar /> Account created on: {profileData.createdAt}
              </div>

              <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '8px' }}>
                {loading ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </form>
          </div>

          {/* Security / Password Form */}
          <div className="glass-panel" style={{ padding: '32px', alignSelf: 'start' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiLock /> Security & Password
            </h2>
            
            <form onSubmit={handlePasswordUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label className="label">New Password</label>
                <div style={{ position: 'relative' }}>
                  <FiLock style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
                  <input type="password" placeholder="Leave blank to keep current" className="input-field" style={{ paddingLeft: '44px' }} value={passwordData.newPassword} onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} minLength={6} required />
                </div>
              </div>

              <div>
                <label className="label">Confirm New Password</label>
                <div style={{ position: 'relative' }}>
                  <FiLock style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
                  <input type="password" placeholder="Confirm new password" className="input-field" style={{ paddingLeft: '44px' }} value={passwordData.confirmPassword} onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})} minLength={6} required />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '8px', background: 'var(--secondary)' }}>
                {loading ? 'Updating...' : 'Change Password'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
