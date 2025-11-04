import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { clearStoredProfile, fetchProfile as fetchProfileApi, updateProfile as updateProfileApi } from '../api/profile.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const loadProfile = useCallback(async () => {
    setStatus('loading');
    setError(null);
    try {
      const profile = await fetchProfileApi();
      setUser(profile);
      setStatus('ready');
    } catch (err) {
      console.error('Failed to fetch profile', err);
      setError(err);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const updateProfile = useCallback(
    async (updates) => {
      setUpdating(true);
      setError(null);
      try {
        const updated = await updateProfileApi({ ...(user ?? {}), ...updates });
        setUser(updated);
        setUpdating(false);
        return { success: true, data: updated };
      } catch (err) {
        console.error('Failed to update profile', err);
        setError(err);
        setUpdating(false);
        return { success: false, error: err };
      }
    },
    [user],
  );

  const logout = useCallback(() => {
    clearStoredProfile();
    setUser(null);
    setStatus('logged-out');
  }, []);

  const value = useMemo(
    () => ({
      user,
      status,
      error,
      updating,
      refreshProfile: loadProfile,
      updateProfile,
      logout,
    }),
    [error, loadProfile, logout, status, updateProfile, updating, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
