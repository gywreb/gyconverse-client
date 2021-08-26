import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { fileUri } from "src/configs/apiClient";

const FriendRequestItem = ({
  avatar,
  username,
  handleConfirmRequest,
  isAccepting,
}) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      pt={4}
      pb={4}
      borderTopWidth="1px"
      borderTopColor="gray.200"
      _hover={{ bgColor: "gray.100" }}
    >
      <Flex alignItems="center" maxWidth="50%" pl={4} pr={4} isTruncated>
        <Avatar
          size="md"
          src={
            avatar
              ? fileUri(avatar)
              : `https://avatars.dicebear.com/api/gridy/${username}.svg`
          }
        />
        <Text isTruncated pl={4}>
          {username || ""}
        </Text>
      </Flex>

      <Flex alignItems="center" pr={4}>
        <Button
          isLoading={isAccepting ? true : false}
          bg="teal.500"
          color="white"
          onClick={handleConfirmRequest}
          mr={2}
        >
          Confirm
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => console.log("press")}
        >
          Delete
        </Button>
      </Flex>
    </Flex>
  );
};

export default FriendRequestItem;
