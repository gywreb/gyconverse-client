import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import AppLayout from "src/components/AppLayout/AppLayout";

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
