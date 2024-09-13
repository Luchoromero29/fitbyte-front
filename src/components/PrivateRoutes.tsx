import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { login } from '../store/authSlice';

import { reqVerifyAuth } from '../service/singinService';
import { reqGetPreferenceByUserId } from '../service/preferenceService';
import { addPreferenceUser } from '../store/preferenceSlice';

const PrivateRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated) {
        const response = await reqVerifyAuth();
        console.log(response);
        
        if (response) {
          const prefereneces = await reqGetPreferenceByUserId(response.data.user.id);
          dispatch(
            addPreferenceUser(
              prefereneces
            )
          )
          dispatch(
            login({
              token: response.token,
              user: response.data.user,
            })
          );
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, [isAuthenticated, dispatch]);

  if (loading) {
    return <div>Loading... privateRoute</div>; // Puedes reemplazar esto con un componente de carga más elaborado si lo deseas.
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;