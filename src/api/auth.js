const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

const ENDPOINTS = {
  admin: '/api/admin/login',
  respondent: '/api/respondent/login',
  logout: '/api/logout',
};

async function parseResponse(response) {
  const text = await response.text();
  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error('Unable to parse server response.');
  }
}

function resolveEndpoint(role) {
  if (role === 'respondent') {
    return ENDPOINTS.respondent;
  }

  return ENDPOINTS.admin;
}

export async function login({ email, password, role = 'admin' }) {
  const endpoint = resolveEndpoint(role);
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    const message = payload?.message || payload?.error || 'Unable to sign in with the provided credentials.';
    throw new Error(message);
  }

  const { token, refreshToken = null, user = null } = payload || {};

  if (!token) {
    throw new Error('The authentication response did not include a token.');
  }

  return { token, refreshToken, user };
}

export async function logout(token) {
  if (!token) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.logout}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const payload = await parseResponse(response);
      const message = payload?.message || payload?.error || 'Unable to sign out at this time.';
      throw new Error(message);
    }
  } catch (error) {
    // Allow logout failures to surface without preventing local cleanup.
    console.warn(error);
    throw error;
  }
}
