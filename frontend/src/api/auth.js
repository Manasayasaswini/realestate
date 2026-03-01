import { request } from './client';

export const registerUser = (body) =>
  request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(body)
  });

export const loginUser = (body) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(body)
  });
