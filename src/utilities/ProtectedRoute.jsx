import { useLocation, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const location = useLocation();
  const isAuth = localStorage.getItem('isAuth');

  if (!isAuth && location.pathname !== '/login' && location.pathname !== '/signup') {
    return <Navigate to="/login" />;
  } else if (isAuth && (location.pathname === '/login' || location.pathname === '/signup')) {
    return <Navigate to="/" />;
  } else if (!isAuth) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoute;
