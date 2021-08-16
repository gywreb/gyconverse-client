import { Avatar, Button, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { GiEmptyHourglass } from "react-icons/gi";
import MotionDiv from "../MotionDiv/MotionDiv";

const PersonCard = ({
  username,
  email,
  avatar,
  handleSendFriendReq,
  isPending,
  isRequesting,
}) => {
  return (
    <MotionDiv
      width="250px"
      height="340px"
      motion="fadeIn"
      borderWidth="2px"
      borderColor="gray.50"
      borderRadius="lg"
      bg="white"
      pt={8}
      pb={8}
      boxShadow="rgba(0,128,128 , 0.4) 5px 5px, rgba(0,128,128 , 0.3) 10px 10px, rgba(0,128,128 , 0.2) 15px 15px, rgba(0,128,128 , 0.1) 20px 20px, rgba(0,128,128 , 0.05) 25px 25px"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        width="100%"
        flexDirection="column"
        isTruncated
      >
        <Avatar size="xl" src={avatar ? avatar : ""} />
        <Text
          maxWidth="80%"
          isTruncated
          fontSize="lg"
          fontWeight="bold"
          color="teal.500"
          mt={4}
        >
          {username || ""}
        </Text>
        <Text maxWidth="80%" isTruncated fontSize="md" color="gray.500" mt={4}>
          {email || ""}
        </Text>
        <Button
          isLoading={isRequesting ? true : false}
          disabled={isPending ? true : false}
          variant={isPending ? "outline" : "solid"}
          colorScheme="teal"
          mt={8}
          onClick={handleSendFriendReq}
          leftIcon={
            <Icon
              as={isPending ? GiEmptyHourglass : BsFillPersonPlusFill}
              color={isPending ? "teal.500" : "white"}
            />
          }
        >
          {isPending ? "Pending" : "Befriend"}
        </Button>
      </Flex>
    </MotionDiv>
  );
};

export default PersonCard;
