// Authentication Token Management

// Store tokens
export const setTokens = (accessToken, refreshToken) => {
  // Access token in sessionStorage for temporary storage
  sessionStorage.setItem('accessToken', accessToken);

  // Refresh token in localStorage for persistence
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
};

// Get access token
export const getAccessToken = () => {
  return sessionStorage.getItem('accessToken');
};

// Get refresh token
export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

// Clear all tokens on logout
export const clearTokens = () => {
  sessionStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getAccessToken();
};

// Store user data
export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Get user data
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Clear user data
export const clearUser = () => {
  localStorage.removeItem('user');
};
