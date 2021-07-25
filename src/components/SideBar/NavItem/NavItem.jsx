import { Icon, IconButton } from "@chakra-ui/react";
import React from "react";

const NavItem = ({ active = false, iconActive, iconBase, onClick }) => {
  return (
    <IconButton
      width="100%"
      paddingTop={8}
      paddingBottom={8}
      bgColor={active ? "teal.700" : "teal.500"}
      borderRadius={0}
      icon={
        <Icon as={active ? iconActive : iconBase} color="white" boxSize={7} />
      }
      _hover={{ bgColor: active ? "none" : "whiteAlpha.400" }}
      _active={{
        bgColor: "none",
        outline: "none",
      }}
      onClick={onClick}
    />
  );
};

export default NavItem;
