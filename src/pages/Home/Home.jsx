import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AppLayout from "src/components/AppLayout/AppLayout";
import { SocketService } from "src/services/SocketService";

const Home = () => {
  return (
    <>
      <AppLayout>
        <Flex width="100%" alignItems="center" flexDir="column">
          Home
        </Flex>
      </AppLayout>
    </>
  );
};

export default Home;
