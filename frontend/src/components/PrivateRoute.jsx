import React from 'react';
import React, { useEffect } from 'react'; // Add useEffect here

import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem('isAuthenticated');

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };
const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
           // const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
            //console.log('Is authenticated:', isAuthenticated);

          await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/check`, { withCredentials: true });
          setIsAuthenticated(true);
        } catch {
          setIsAuthenticated(false);
        }
      };
  
      checkAuth();
    }, []);
  
    if (isAuthenticated === null) return <div>Loading...</div>;
  
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  

export default PrivateRoute;

