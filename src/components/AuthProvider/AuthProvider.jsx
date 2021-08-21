import { useToast } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import { ROUTE_KEY } from "src/configs/routes";
import Chat from "src/pages/Chat/Chat";
import GroupChat from "src/pages/GroupChat/GroupChat";
import Home from "src/pages/Home/Home";
import Login from "src/pages/Login/Login";
import Register from "src/pages/Register/Register";
import VideoCall from "src/pages/VideoCall/VideoCall";
import { SocketService } from "src/services/SocketService";
import { getCurrent } from "src/store/auth/actions";
import { resetNavigation } from "src/store/navigation/actions";
import AuthRoute from "../AuthRoute/AuthRoute";
import OverlaySpinner from "../OverlaySpinner/OverlaySpinner";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const AuthProvider = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { getCurrentLoading, userInfo, token } = useSelector(
    (state) => state.auth
  );
  const history = useHistory();
  useEffect(() => {
    dispatch(getCurrent(history, toast));
    return () => {
      if (SocketService.client) SocketService.disconnect();
      dispatch(resetNavigation());
    };
  }, [dispatch]);

  if (getCurrentLoading) return <OverlaySpinner />;
  else
    return (
      <>
        <Route
          path={ROUTE_KEY.Home}
          exact
          render={() =>
            userInfo || token ? (
              <Redirect to={ROUTE_KEY.Home} />
            ) : (
              <Redirect to={ROUTE_KEY.Login} />
            )
          }
        />
        <PrivateRoute path={ROUTE_KEY.Home} exact component={<Home />} />
        <PrivateRoute path={ROUTE_KEY.Chat} exact component={<Chat />} />
        <PrivateRoute
          path={ROUTE_KEY.GroupChat}
          exact
          component={<GroupChat />}
        />
        <PrivateRoute
          path={ROUTE_KEY.VideoCall}
          exact
          component={<VideoCall />}
        />
        <AuthRoute path={ROUTE_KEY.Login} exact component={<Login />} />
        <AuthRoute path={ROUTE_KEY.Register} exact component={<Register />} />
      </>
    );
};

export default AuthProvider;
