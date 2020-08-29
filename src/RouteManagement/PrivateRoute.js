import React from "react";
import { Route, Redirect } from "react-router-dom";
import { urls } from "../config";
const PrivateRoute = (props) => {
  const { component: Component, ...rest } = props;
  const isAuth = !!localStorage.getItem("access_token");
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return isAuth ? (
          <Component {...rest} {...routeProps} />
        ) : (
          <Redirect to={urls.signIn} />
        );
      }}
    />
  );
};

export default PrivateRoute;
