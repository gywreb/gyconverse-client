import {
  Box,
  Flex,
  Grid,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
  Wrap,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "src/components/AppLayout/AppLayout";
import AppScrollBar from "src/components/AppScrollBar/AppScrollBar";
import HomeHeader from "src/components/HomeHeader/HomeHeader";
import PersonCard from "src/components/PersonCard/PersonCard";
import { SocketService } from "src/services/SocketService";
import { sendFriendRequest } from "src/store/auth/actions";
import { getRandomPeople } from "src/store/user/actions";

const Home = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { people, loading } = useSelector((state) => state.user);
  const { userInfo, frLoading, requestingId } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getRandomPeople(toast));
  }, [dispatch]);

  const handleSendFriendReq = (person) => {
    dispatch(sendFriendRequest(userInfo, person, toast));
  };

  return (
    <>
      <AppLayout>
        <Flex
          flexDirection="column"
          width="100%"
          alignItems="center"
          flexDir="column"
          height="100vh"
          bg="gray.200"
          position="relative"
          pt="70px"
          pb="40px"
        >
          <HomeHeader />
          {loading ? (
            <Flex
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
              bg="gray.200"
            >
              <Spinner color="teal.500" boxSize={32} thickness="6px" />
            </Flex>
          ) : (
            <Flex
              width="100%"
              overflowY="scroll"
              height="100%"
              overflowX="hidden"
              flexDirection="column"
              css={{
                "&:hover": {
                  "&::-webkit-scrollbar": {
                    visibility: "visible",
                    overflow: "hidden",
                  },
                  "&::-webkit-scrollbar-track": {
                    visibility: "visible",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    visibility: "visible",
                  },
                },
                "&::-webkit-scrollbar": {
                  width: "8px",
                  visibility: "hidden",
                },
                "&::-webkit-scrollbar-track": {
                  width: "10px",
                  visibility: "hidden",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#A0AEC0",
                  borderRadius: "24px",
                  visibility: "hidden",
                },
              }}
            >
              <Text
                pt={8}
                alignSelf="center"
                fontSize="2xl"
                fontWeight="bold"
                color="teal.500"
              >
                Befriend first to fun conversation!
              </Text>
              <Wrap justify="center" spacing="80px" p={8}>
                {people?.length
                  ? people.map((person) => (
                      <PersonCard
                        avatar={person.avatar}
                        username={person.username}
                        email={person.email}
                        handleSendFriendReq={() => handleSendFriendReq(person)}
                        isPending={userInfo.pendingRequests?.find(
                          (pending) => pending === person._id
                        )}
                        isRequesting={frLoading && person._id == requestingId}
                      />
                    ))
                  : null}
              </Wrap>
            </Flex>
          )}
          <Flex
            position="absolute"
            bottom="0"
            bg="white"
            width="100%"
            height="40px"
            alignSelf="flex-end"
            borderWidth="2px"
            borderColor="gray.200"
            zIndex="99"
            alignItems="center"
            paddingRight="1%"
            paddingLeft="1%"
            justifyContent="space-between"
          ></Flex>
        </Flex>
      </AppLayout>
    </>
  );
};

export default Home;
