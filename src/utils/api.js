const API_URL = 'http://localhost:4000/api';

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // token expired or invalid
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Authentication failed');
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}; 