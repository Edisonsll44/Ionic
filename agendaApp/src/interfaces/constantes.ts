import { environment } from "src/environments/environment";

export const ENDPOINTS = {
  PERSON_API: '/personApi.php',
  LOGIN: '/login.php',
  REGISTER: '/register.php',
};


export const getApiUrl = (endpoint: keyof typeof ENDPOINTS): string => {
  return `${environment.API_BASE_URL}${ENDPOINTS[endpoint]}`;
};
