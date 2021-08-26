import { Avatar, Flex, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { navItems } from "src/configs/navigation";
import { ROUTE_KEY } from "src/configs/routes";
import { Events, SocketService } from "src/services/SocketService";
import { logout } from "src/store/auth/actions";
import { setActiveNavigation } from "src/store/navigation/actions";
import MotionDiv from "../MotionDiv/MotionDiv";
import NavItem from "./NavItem/NavItem";
import GCIcon from "../../assets/images/gc-icon-smooth.png";
import EditableProfile from "../EditableProfile/EditableProfile";
import { fileUri } from "src/configs/apiClient";

const SideBar = () => {
  const { navigation, activeNav } = useSelector((state) => state.navigation);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(setActiveNavigation(location.pathname));
  }, []);

  const handleNavigation = (id, routeKey) => {
    dispatch(setActiveNavigation(id));
    if (id !== ROUTE_KEY.Logout) {
      if (routeKey === ROUTE_KEY.Home) {
        SocketService.client.off(Events.receiveFriendRequest);
        SocketService.client.off(Events.alertAcceptFriendRequest);
        history.replace({
          pathname: routeKey,
        });
      }
      if (routeKey === ROUTE_KEY.Chat) {
        if (!userInfo?.friends.length) {
          toast({
            title:
              "You know you need friends to have FUN conversations right !?",
            position: "top",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        } else {
          let isNoSingleRoom = userInfo.friends.filter(
            (friend) => friend.singleRoom !== null
          );
          if (!isNoSingleRoom.length) {
            toast({
              title: "Let's click that 'chat' button with someone first!",
              position: "top",
              status: "warning",
              duration: 5000,
              isClosable: true,
            });
          } else
            history.replace({
              pathname: routeKey,
              state: { isChatInit: true },
            });
        }
      } else history.replace({ pathname: routeKey });
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
            cursor="pointer"
            size="md"
            src={
              userInfo?.avatar
                ? fileUri(userInfo.avatar)
                : `https://avatars.dicebear.com/api/gridy/${userInfo?.username}.svg`
            }
            //bgColor={userInfo?.avatar ? "white" : "teal"}
            boxShadow="lg"
            padding="2px"
            onClick={() => {
              onOpen();
            }}
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
      <EditableProfile userInfo={userInfo} isOpen={isOpen} onClose={onClose} />
    </MotionDiv>
  );
};

export default SideBar;
