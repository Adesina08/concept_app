const ADMIN_API_BASE_URL = (import.meta.env.VITE_ADMIN_API_BASE_URL || import.meta.env.VITE_API_BASE_URL || '').trim();
const CLIENT_API_BASE_URL = (import.meta.env.VITE_CLIENT_API_BASE_URL || import.meta.env.VITE_API_BASE_URL || '').trim();

const trimSlash = (value = '') => value.replace(/\/+$/, '');
const normalizePath = (path = '') => path.replace(/^\/+/, '');

const buildUrl = (baseUrl, path) => {
  const normalizedPath = normalizePath(path || '');

  if (!baseUrl) {
    return normalizedPath ? `/${normalizedPath}` : '/';
  }

  const trimmedBase = trimSlash(baseUrl);
  return normalizedPath ? `${trimmedBase}/${normalizedPath}` : trimmedBase;
};

const buildConceptFormData = (payload = {}) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (key === 'assets' && Array.isArray(value)) {
      value.filter(Boolean).forEach((file) => {
        formData.append('assets', file);
      });
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) {
          formData.append(`${key}[]`, item);
        }
      });
      return;
    }

    formData.append(key, value);
  });

  return formData;
};

const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  let payload = null;

  if (contentType.includes('application/json')) {
    payload = await response.json();
  } else {
    const text = await response.text();
    payload = text ? { message: text } : null;
  }

  if (!response.ok) {
    const error = new Error(payload?.message || `Request failed with status ${response.status}`);
    error.response = response;
    error.data = payload;
    throw error;
  }

  return payload;
};

export const createConcept = async (payload = {}, options = {}) => {
  const { endpoint = '/concepts', signal, fetchOptions = {} } = options;
  const url = buildUrl(ADMIN_API_BASE_URL, endpoint);
  const formData = buildConceptFormData(payload);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    signal,
    ...fetchOptions,
  });

  return parseResponse(response);
};

export const submitConcept = async (payload = {}, options = {}) => {
  const { endpoint = '/concepts/submit', signal, fetchOptions = {} } = options;
  const url = buildUrl(CLIENT_API_BASE_URL, endpoint);
  const formData = buildConceptFormData(payload);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
    signal,
    ...fetchOptions,
  });

  return parseResponse(response);
};
