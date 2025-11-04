const PROFILE_STORAGE_KEY = 'concept-app-demo-profile';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const defaultProfile = {
  id: 'user_001',
  name: 'Sophia Carter',
  email: 'sophia.carter@example.com',
  role: 'Client',
  bio: 'Product strategist passionate about co-creating with consumers.',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAD5kGYELEbQZ_gA1bZ66c0xfnW41Hatxev5Wrv5AXYrRVzzqiYeBDwDvBP-oAylwd_Um2SpwSigXeyX9pfgdXVbneSr_EYtLdbvKCJHCCHblKr5g6kEGVcXqt7JUo89zuw_X8I6jFae_QLXOYCK5Spr63Fu9P-z2vXuPOS39eONGCUCcp-WXuzu62NqKGPbWjfienr6pXwAidc_kC9_6XBM1T9GIa5-9ux4TvY4vTlEOltfEW2xQVf3ZiEb4XLpKkAtHip5FK-W0Ig',
  joinDate: '2022-02-14T00:00:00.000Z',
  notifications: {
    researchUpdates: true,
    weeklyDigest: true,
    newFeedback: true,
  },
};

const readStorage = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn('Unable to read stored profile', error);
    return null;
  }
};

const writeStorage = (profile) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (error) {
    console.warn('Unable to persist profile', error);
  }
};

export const fetchProfile = async () => {
  await delay(350);
  const stored = readStorage();
  return stored ?? defaultProfile;
};

export const updateProfile = async (updates = {}) => {
  await delay(250);
  const current = readStorage() ?? defaultProfile;
  const nextProfile = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  writeStorage(nextProfile);
  return nextProfile;
};

export const clearStoredProfile = () => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.removeItem(PROFILE_STORAGE_KEY);
  } catch (error) {
    console.warn('Unable to clear stored profile', error);
  }
};
