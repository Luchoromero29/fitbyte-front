// src/components/PrivateRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { login } from '../store/authSlice';

import { reqVerifyAuth } from '../service/singinService';

const PrivateRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated) {
        const response = await reqVerifyAuth();
        if (response) {
          dispatch(
            login({
              token: response.token,
              user: response.user.user,
            })
          );
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, [isAuthenticated, dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Puedes reemplazar esto con un componente de carga más elaborado si lo deseas.
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
