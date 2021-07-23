import {
  Box,
  Button,
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
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/all";
import { ROUTE_KEY } from "../../configs/routes";
import MotionDiv from "../../components/MotionDiv/MotionDiv";
import { Link } from "react-router-dom";
import omit from "lodash/omit";
import { useDispatch, useSelector } from "react-redux";
import { register as registerApi } from "../../store/auth/actions";

const Register = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const toast = useToast();
  const { loading } = useSelector((state) => state.auth);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);

  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = async (values) => {
    let newUser = omit(values, "confirmPassword");
    dispatch(registerApi(newUser, history, toast, reset));
  };

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleShowConfirmPassword = () => {
    setIsShowConfirmPass(!isShowConfirmPass);
  };

  return (
    <Flex height="100vh" wrap="wrap" alignItems="center" bg="gray.50">
      <Flex
        w="50%"
        wrap="wrap"
        alignItems="center"
        justify="center"
        pl={4}
        mt={10}
        pb={16}
      >
        <MotionDiv
          motion="slideRightIn"
          width={400}
          bg="white"
          borderWidth="2px"
          borderColor="gray.50"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="rgba(0,128,128 , 0.4) -5px 5px, rgba(0,128,128 , 0.3) -10px 10px, rgba(0,128,128 , 0.2) -15px 15px, rgba(0,128,128 , 0.1) -20px 20px, rgba(0,128,128 , 0.05) -25px 25px"
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
              Sign-Up
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={8}>
                <FormControl isInvalid={errors.username}>
                  <InputGroup size="lg">
                    <InputLeftElement
                      children={<Icon as={MdPerson} color="teal.500" />}
                    />
                    <Input
                      variant="filled"
                      id="username"
                      type="text"
                      placeholder="Username"
                      {...register("username", {
                        required: "Username is required",
                        minLength: {
                          value: 3,
                          message: "Username is must be at least 3 characters",
                        },
                      })}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.username && errors.username.message}
                  </FormErrorMessage>
                </FormControl>
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
                        minLength: {
                          value: 8,
                          message: "Username is must be at least 8 characters",
                        },
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
                <FormControl isInvalid={errors.confirmPassword}>
                  <InputGroup size="lg">
                    <InputLeftElement
                      children={<Icon as={MdLock} color="teal.500" />}
                    />
                    <Input
                      variant="filled"
                      id="confirmPassword"
                      type={isShowConfirmPass ? "text" : "password"}
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value) =>
                          value === password.current ||
                          "Confirm password do not match",
                      })}
                    />
                    <InputRightElement mr={1}>
                      <Button onClick={handleShowConfirmPassword}>
                        {isShowPassword ? (
                          <Icon as={AiFillEyeInvisible} color="teal.500" />
                        ) : (
                          <Icon as={AiFillEye} color="teal.500" />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  size="lg"
                  mt={4}
                  colorScheme="teal"
                  isLoading={loading}
                  type="submit"
                >
                  SIGN-UP
                </Button>
                <Flex alignItems="center" justifyContent="center">
                  <Text color="gray.500">Already have it ?</Text>
                  <Link to={ROUTE_KEY.Login}>
                    <Text pl={2} color="teal.500">
                      Sign-In
                    </Text>
                  </Link>
                </Flex>
              </Stack>
            </form>
          </Box>
        </MotionDiv>
      </Flex>
      <MotionDiv motion="slideLeftIn" w="50%">
        <Flex
          h="100%"
          flexDirection="column"
          alignItems="flex-start"
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
    </Flex>
  );
};

export default Register;
