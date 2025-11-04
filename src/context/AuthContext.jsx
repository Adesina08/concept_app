import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { login as apiLogin, logout as apiLogout } from '../api/auth.js';

const AuthContext = createContext(undefined);

const STORAGE_KEY = 'concept_app_auth';

function readStoredAuth() {
  if (typeof window === 'undefined') {
    return { token: null, user: null, refreshToken: null };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { token: null, user: null, refreshToken: null };
    }

    const parsed = JSON.parse(raw);
    return {
      token: parsed?.token ?? null,
      user: parsed?.user ?? null,
      refreshToken: parsed?.refreshToken ?? null,
    };
  } catch (error) {
    console.warn('Unable to parse stored auth payload', error);
    return { token: null, user: null, refreshToken: null };
  }
}

function writeStoredAuth(payload) {
  if (typeof window === 'undefined') {
    return;
  }

  if (!payload?.token) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      token: payload.token,
      refreshToken: payload.refreshToken ?? null,
      user: payload.user ?? null,
    }),
  );
}

export const AuthProvider = ({ children }) => {
  const initialAuth = useMemo(() => readStoredAuth(), []);
  const [token, setToken] = useState(initialAuth.token);
  const [refreshToken, setRefreshToken] = useState(initialAuth.refreshToken);
  const [user, setUser] = useState(initialAuth.user);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const authenticate = useCallback(async ({ email, password, role }) => {
    const result = await apiLogin({ email, password, role });

    const userPayload = result.user ?? {
      email,
      role: role ?? 'admin',
    };

    setToken(result.token);
    setRefreshToken(result.refreshToken ?? null);
    setUser(userPayload);
    writeStoredAuth({ token: result.token, refreshToken: result.refreshToken, user: userPayload });

    return { token: result.token, refreshToken: result.refreshToken ?? null, user: userPayload };
  }, []);

  const deauthenticate = useCallback(async () => {
    try {
      await apiLogout(token);
    } catch (error) {
      // Intentionally swallow errors after logging, so local state can still be cleared.
      console.warn('Failed to notify server of logout', error);
    } finally {
      setToken(null);
      setUser(null);
      setRefreshToken(null);
      writeStoredAuth({ token: null });
    }
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      refreshToken,
      user,
      isAuthenticated: Boolean(token),
      isHydrated,
      login: authenticate,
      logout: deauthenticate,
    }),
    [authenticate, deauthenticate, isHydrated, refreshToken, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
