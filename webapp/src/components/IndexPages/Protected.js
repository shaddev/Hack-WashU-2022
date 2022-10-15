import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protected = (props) => {
    
    const isLoggedIn = props.isLoggedIn;
    const matchType = props.matchType;

    return (isLoggedIn && matchType) ? <Outlet /> : <Navigate to="/login" />;
}

export default Protected;