import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Protected = (props) => {
    
    const isLoggedIn = props.isLoggedIn;
    const matchType = props.matchType;

    if (matchType === undefined){
        return (isLoggedIn) ? <Outlet /> : <Navigate to="/login" />;
    } else{
        return (isLoggedIn && matchType) ? <Outlet /> : <Navigate to="/login" />;
    }

}

export default Protected;