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



// bug fix. 
// import { useLocation, Navigate, Outlet } from 'react-router-dom';

// const getCookie = (name) => {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// };

// const ProtectedRoute = () => {
//   const location = useLocation();
//   const accessToken = getCookie('accessToken');
//   const isAuth = !!accessToken; // isAuth is true if accessToken exists

//   if (!isAuth && location.pathname !== '/login' && location.pathname !== '/signup') {
//     return <Navigate to="/login" />;
//   } else if (isAuth && (location.pathname === '/login' || location.pathname === '/signup')) {
//     return <Navigate to="/" />;
//   } else if (!isAuth) {
//     return <Navigate to="/login" />;
//   } else {
//     return <Outlet />;
//   }
// };

// export default ProtectedRoute;

