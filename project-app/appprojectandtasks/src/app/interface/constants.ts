import { environment } from "src/environments/environment";

export const PROJECTS_API: string = '/proyectoapi.php';
export const TASK_API: string =  '/tareasapi.php/{0}/{1}';
export const TASK_API_TRANSACTIONS: string =  '/tareasapi.php';
export const  PROJECTS_API_DELETE: string =  '/proyectoapi.php/{0}';
export const  TASK_API_DELETE: string =  '/tareasapi.php/{0}';


export const filter_pr:string = "project";


export const getApiUrl = (endpoint: string): string => {
  return `${environment.API_BASE_URL}${[endpoint]}`;
};

export const formatUrl = (url: string, ...args: any[]): string => {
  return url.replace(/{(\d+)}/g, (match, index) => {
    const replacement = args[index];
    return replacement !== undefined ? replacement : match;
  });
};
