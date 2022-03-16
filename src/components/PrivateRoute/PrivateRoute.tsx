import React from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
    isAuth: boolean
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, isAuth }) => (
    <React.Fragment>
        {isAuth ? children : <Navigate to="/" />}
    </React.Fragment>
);

export default PrivateRoute;