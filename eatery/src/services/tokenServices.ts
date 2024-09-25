const AccessTokenStorageKey = "access_token";

export const setToken = (token: string) => {
  localStorage.setItem(AccessTokenStorageKey, token);
};

export const getToken = () => {
  return localStorage.getItem(AccessTokenStorageKey);
};

export const removeToken = () => {
  localStorage.removeItem(AccessTokenStorageKey);
};