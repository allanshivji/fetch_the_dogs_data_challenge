import urlJoin from 'url-join';

export const BASE_URL = 'https://frontend-take-home-service.fetch.com';

export const API_URL = {
  LOGIN: urlJoin(BASE_URL, '/auth/login'),
  LOGOUT: urlJoin(BASE_URL, '/auth/logout'),
  DOGS_BREEDS: urlJoin(BASE_URL, '/dogs/breeds'),
  DOGS_SEARCH: urlJoin(BASE_URL, '/dogs/search'),
  DOGS: urlJoin(BASE_URL, '/dogs'),
  DOGS_MATCH: urlJoin(BASE_URL, '/dogs/match'),
  LOCATIONS: urlJoin(BASE_URL, '/locations'),
  LOCATIONS_SEARCH: urlJoin(BASE_URL, '/locations/search')
};
