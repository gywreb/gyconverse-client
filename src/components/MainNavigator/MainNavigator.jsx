import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ROUTE_KEY } from "src/configs/routes";
import Chat from "src/pages/Chat/Chat";
import GroupChat from "src/pages/GroupChat/GroupChat";
import Home from "src/pages/Home/Home";
import Login from "src/pages/Login/Login";
import Register from "src/pages/Register/Register";
import { resetNavigation } from "src/store/navigation/actions";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const MainNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetNavigation());
    };
  }, []);

  return (
    <Router>
      <PrivateRoute path={ROUTE_KEY.Home} component={<Home />} />
      <PrivateRoute path={ROUTE_KEY.Chat} component={<Chat />} />
      <PrivateRoute path={ROUTE_KEY.GroupChat} component={<GroupChat />} />
      <Route path={ROUTE_KEY.Login} component={Login} />
      <Route path={ROUTE_KEY.Register} component={Register} />
    </Router>
  );
};

export default MainNavigator;
