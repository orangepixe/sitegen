
import CryptoJS from 'crypto-js';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = CryptoJS.MD5('admin').toString();
const AUTH_KEY = 'admin_authenticated';

export const login = (username: string, password: string): boolean => {
  const passwordHash = CryptoJS.MD5(password).toString();
  
  if (username === ADMIN_USERNAME && passwordHash === ADMIN_PASSWORD_HASH) {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};
