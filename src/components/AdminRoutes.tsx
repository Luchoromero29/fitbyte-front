// src/components/PrivateRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const AdminRoute: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Set initial state to false

    const user = useSelector((state: RootState) => state.auth.user);
    
    useEffect(() => {
        const handleAuthState = () => {
            setIsAuthenticated(user?.rolId === 1);
            setLoading(false); // Set loading to false after checking auth
        };

        if (!loading) return; // Avoid unnecessary re-runs

        handleAuthState();

        // Optionally, subscribe to store changes for dynamic updates (if needed)
        // const unsubscribe = store.subscribe(handleAuthState);
        // return () => unsubscribe();
    }, [loading]);

    console.log("isAuthenticated in AdminRoute:", isAuthenticated);

    if (loading) return <div>Loading...</div>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;


