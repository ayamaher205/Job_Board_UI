
import AuthService from './AuthService';

export const requireAuth = (to, from, next) => {
  const isAuthenticated = AuthService.isAuthenticated(); 
  if (isAuthenticated) {
    next(); 
  } else {
    next('/login'); 
  }
};
