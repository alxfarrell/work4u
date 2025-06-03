const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
    throw new Error('Authentication failed');
  }
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Something went wrong');
  return data;
};

export const getAllExercises = () => fetchWithAuth('/exercises');

export const getByLevel = level =>
  fetchWithAuth(`/exercises/level/${encodeURIComponent(level)}`);

export const getRandomByGroup = muscleGroup =>
  fetchWithAuth(`/exercises/workout/${encodeURIComponent(muscleGroup)}`);

export const getRandomTarget = (target, level) =>
  fetchWithAuth(
    `/exercises/workout-target/${encodeURIComponent(target)}${
      level ? `?level=${encodeURIComponent(level)}` : ''
    }`
  );

export const getRandomWorkout = (muscleGroup, level, num = 1) => {
  const params = new URLSearchParams({ muscleGroup });
  if (level) params.append('level', level);
  if (num) params.append('num', num);
  return fetchWithAuth(`/exercises/random-workout?${params.toString()}`);
};
