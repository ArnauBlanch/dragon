const PREFERRED_DEVICE_ID = 'preferredDeviceId';
export const getPreferredDeviceId = () => window.localStorage.getItem(PREFERRED_DEVICE_ID);
export const setPreferredDeviceId = (id: string) =>
  window.localStorage.setItem(PREFERRED_DEVICE_ID, id);

const USER_NAME = 'user_name';
export const getUserName = () => window.localStorage.getItem(USER_NAME);

const API_KEY = 'api_key';
export const getApiKey = () => window.localStorage.getItem(API_KEY);

export const setUserData = (name: string, apiKey: string) => {
  window.localStorage.setItem(USER_NAME, name);
  window.localStorage.setItem(API_KEY, apiKey);
};

export const removeUserData = () => {
  window.localStorage.removeItem(USER_NAME);
  window.localStorage.removeItem(API_KEY);
};

export const isAuthenticated = () => getUserName() !== null && getApiKey() !== null;
