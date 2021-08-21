import { Avatar, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { navItems } from "src/configs/navigation";
import { ROUTE_KEY } from "src/configs/routes";
import { logout } from "src/store/auth/actions";
import { setActiveNavigation } from "src/store/navigation/actions";
import MotionDiv from "../MotionDiv/MotionDiv";
import NavItem from "./NavItem/NavItem";

const SideBar = () => {
  const { navigation, activeNav } = useSelector((state) => state.navigation);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    dispatch(setActiveNavigation(location.pathname));
  }, []);

  const handleNavigation = (id, routeKey) => {
    dispatch(setActiveNavigation(id));
    if (id !== ROUTE_KEY.Logout) {
      if (routeKey === ROUTE_KEY.Chat)
        history.replace({ pathname: routeKey, state: { isChatInit: true } });
      else history.replace({ pathname: routeKey });
    } else if (id === ROUTE_KEY.Logout) {
      dispatch(logout(userInfo, history));
    }
  };

  return (
    <MotionDiv
      // motion="slideLeftIn"
      position="static"
      left={0}
      height="100vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      width="7%"
      justifyContent="space-between"
      bg="teal.500"
    >
      <Flex p="5%" flexDir="column" w="100%" alignItems="center" mb={4}>
        <Flex mt={4} alignItems="center">
          <Avatar
            size="md"
            src="https://avatars.githubusercontent.com/gywreb"
          />
        </Flex>
      </Flex>

      <Stack mt={8} spacing={0}>
        {(navigation.length ? navItems : navigation).map((nav, index) => (
          <NavItem
            key={index}
            active={
              location.pathname
                ? nav.id === location.pathname
                : nav.id === activeNav
            }
            iconBase={nav.iconBase}
            iconActive={nav.iconActive}
            onClick={() => handleNavigation(nav.id, nav.routeKey)}
          />
        ))}
      </Stack>
    </MotionDiv>
  );
};

export default SideBar;
