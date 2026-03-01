import { request } from './client';

const authHeader = (token) => ({ Authorization: `Bearer ${token}` });

export const getLands = (token) =>
  request('/lands', {
    method: 'GET',
    headers: authHeader(token)
  });

export const getLandById = (token, landId) =>
  request(`/lands/${landId}`, {
    method: 'GET',
    headers: authHeader(token)
  });

export const getPlotsByLandId = (token, landId) =>
  request(`/lands/${landId}/plots`, {
    method: 'GET',
    headers: authHeader(token)
  });

export const getPlotById = (token, plotId) =>
  request(`/plots/${plotId}`, {
    method: 'GET',
    headers: authHeader(token)
  });

export const getPlot3DByPlotId = (token, plotId) =>
  request(`/plots/${plotId}/3d`, {
    method: 'GET',
    headers: authHeader(token)
  });
