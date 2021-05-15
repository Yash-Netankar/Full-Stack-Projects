import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, logged: logged, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            if (logged) return <Component />
            else return <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        }} />
    )
}

export default ProtectedRoute
