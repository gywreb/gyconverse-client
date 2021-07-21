import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/all";
import { ROUTE_KEY } from "../../configs/routes";
import { motion } from "framer-motion";
import MotionDiv from "../../components/MotionDiv/MotionDiv";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [isShowPassword, setIsShowPassword] = useState(false);

  const onSubmit = (values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        reset();
        resolve();
      }, 3000);
    });
  };

  console.log(errors);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <Flex height="100vh" wrap="wrap" alignItems="center" bg="gray.50">
      <MotionDiv motion="slideLeftIn" w="50%">
        <Flex
          h="100%"
          flexDirection="column"
          alignItems="flex-end"
          justify="center"
        >
          <Text
            bgGradient="linear(to-r, cyan.600, teal.900)"
            bgClip="text"
            fontSize="8xl"
            fontWeight="extrabold"
          >
            GyConverse
          </Text>
          <Text
            mt={-2}
            mb={4}
            bgGradient="linear(to-r, cyan.600, teal.900)"
            bgClip="text"
            fontSize="3xl"
          >
            Fun conversation begin.
          </Text>
        </Flex>
      </MotionDiv>
      <Flex w="50%" wrap="wrap" alignItems="center" justify="center" pl={4}>
        <MotionDiv
          motion="slideRightIn"
          width={400}
          bg="white"
          borderWidth="2px"
          borderColor="gray.50"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="rgba(0,128,128 , 0.4) 5px 5px, rgba(0,128,128 , 0.3) 10px 10px, rgba(0,128,128 , 0.2) 15px 15px, rgba(0,128,128 , 0.1) 20px 20px, rgba(0,128,128 , 0.05) 25px 25px"
        >
          <Box p={6} mb={10}>
            <Text
              pt={5}
              pb={5}
              bgGradient="linear(to-r, cyan.500, teal.900)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="bold"
              textAlign="center"
            >
              Sign-In
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={8}>
                <FormControl isInvalid={errors.email}>
                  <InputGroup size="lg">
                    <InputLeftElement
                      children={<Icon as={MdEmail} color="teal.500" />}
                    />
                    <Input
                      variant="filled"
                      id="email"
                      type="email"
                      placeholder="Email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                          message: "Invalid email",
                        },
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                  <InputGroup size="lg">
                    <InputLeftElement
                      children={<Icon as={MdLock} color="teal.500" />}
                    />
                    <Input
                      variant="filled"
                      id="password"
                      type={isShowPassword ? "text" : "password"}
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <InputRightElement mr={1}>
                      <Button onClick={handleShowPassword}>
                        {isShowPassword ? (
                          <Icon as={AiFillEyeInvisible} color="teal.500" />
                        ) : (
                          <Icon as={AiFillEye} color="teal.500" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  size="lg"
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  SIGN-IN
                </Button>
                <Flex alignItems="center" justifyContent="center">
                  <Text color="gray.500">First time here ?</Text>
                  <Link to={ROUTE_KEY.Register}>
                    <Text pl={2} color="teal.500">
                      Sign-Up
                    </Text>
                  </Link>
                </Flex>
              </Stack>
            </form>
          </Box>
        </MotionDiv>
      </Flex>
    </Flex>
  );
};

export default Login;
