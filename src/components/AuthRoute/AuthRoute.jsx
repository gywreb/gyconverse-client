import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { ROUTE_KEY } from "src/configs/routes";

const AuthRoute = ({ path, component }) => {
  const { userInfo, token } = useSelector((state) => state.auth);
  return (
    <Route path={path} exact>
      {userInfo || token ? <Redirect to={ROUTE_KEY.Home} exact /> : component}
    </Route>
  );
};

export default AuthRoute;
