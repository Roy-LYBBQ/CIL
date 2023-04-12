import { LocalStorageKeys } from './local-storage-keys';

export const getAccessToken = () => {
  return localStorage.getItem(LocalStorageKeys.AccessToken);
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(LocalStorageKeys.AccessToken, token);
};

export const clearAccessToken = () => {
  localStorage.removeItem(LocalStorageKeys.AccessToken);
};
