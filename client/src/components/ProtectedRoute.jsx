import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = (props) => {
    if (!props.isAllowed) {
        return <Navigate to="/" replace />;
    };
    return <Outlet />
};
