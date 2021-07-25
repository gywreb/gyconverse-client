import {
  BsChatDots,
  BsChatDotsFill,
  BsHouse,
  BsHouseFill,
} from "react-icons/bs";
import {
  RiGroupFill,
  RiGroupLine,
  RiLogoutBoxFill,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { ROUTE_KEY } from "./routes";

export const navItems = [
  {
    id: ROUTE_KEY.Home,
    iconBase: BsHouse,
    iconActive: BsHouseFill,
    routeKey: ROUTE_KEY.Home,
  },
  {
    id: ROUTE_KEY.Chat,
    iconBase: BsChatDots,
    iconActive: BsChatDotsFill,
    routeKey: ROUTE_KEY.Chat,
  },
  {
    id: ROUTE_KEY.GroupChat,
    iconBase: RiGroupLine,
    iconActive: RiGroupFill,
    routeKey: ROUTE_KEY.GroupChat,
  },
  {
    id: ROUTE_KEY.Login,
    iconBase: RiLogoutBoxLine,
    iconActive: RiLogoutBoxFill,
    routeKey: ROUTE_KEY.Login,
  },
];
