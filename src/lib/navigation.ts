import type { NavigateFunction } from 'react-router-dom';

let navigate: NavigateFunction;
export const injectNavigate = (n: NavigateFunction) => { navigate = n; };
export const navigateTo = (path: string) => navigate?.(path);
