const API_BASE_URL = '/api/respondent';

const handleJsonResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = payload?.message || 'An unexpected error occurred.';
    throw new Error(message);
  }

  return payload;
};

export const submitDecision = async ({ conceptId, decision }) => {
  const body = JSON.stringify({ conceptId, decision });

  const response = await fetch(`${API_BASE_URL}/responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  return handleJsonResponse(response);
};

export const uploadFeedbackAudio = async ({ conceptId, blob }) => {
  const formData = new FormData();
  formData.append('conceptId', conceptId);
  formData.append('file', blob, `${conceptId}-feedback.webm`);

  const response = await fetch(`${API_BASE_URL}/responses/audio`, {
    method: 'POST',
    body: formData,
  });

  return handleJsonResponse(response);
};

export const fetchRespondentAssignments = async () => {
  const response = await fetch(`${API_BASE_URL}/assignments`);
  return handleJsonResponse(response);
};

export const fetchRespondentProgress = async () => {
  const response = await fetch(`${API_BASE_URL}/progress`);
  return handleJsonResponse(response);
};
