import React, { useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Flex,
    Heading,
    Text,
    useColorModeValue,
    InputGroup,
    InputRightElement,
    FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { logger } from "tools/logger";
//icons
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function SigninCard() {
    const [showPassword, setShowPassword] = useState(false);
    const { status } = useSession();
    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { isSubmitting },
    } = useForm();

    const defaultBody = {
        grant_type: "",
        username: "asdf@gml.com",
        password: "asdf",
        scope: "",
        client_id: "",
        client_secret: "",
    };

    async function onSubmit(values: any) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const body = { ...defaultBody, ...values };

            logger.debug(`POSTing ${JSON.stringify(body, null, 2)}`);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const res = await signIn("credentials", {
                ...body,
                callbackUrl: router.query.callbackUrl,
            });
            logger.debug(`signing:onsubmit:res`, res);
        } catch (error) {
            logger.error(error);
        }
    }
    if (status === "authenticated") {
        void router.push("/", {
            query: {
                callbackUrl: router.query.callbackUrl,
            },
        });
    }

    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                </Stack>
                <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4} pt={10}>
                            <FormControl id="email" isInvalid={Boolean(router.query.error)} isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type="email" {...register("username")} />
                            </FormControl>
                            <FormControl id="password" isRequired isInvalid={Boolean(router.query.error)}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? "text" : "password"} {...register("password")} />
                                    <InputRightElement h={"full"}>
                                        <Button
                                            variant={"ghost"}
                                            _hover={{ bg: "transparent" }}
                                            _active={{ bg: "transparent" }}
                                            // eslint-disable-next-line @typescript-eslint/no-shadow
                                            onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {router.query.error && router.query.error === "CredentialsSignin" && (
                                    <FormErrorMessage>Invalid credentials</FormErrorMessage>
                                )}
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    align={"start"}
                                    justify={"space-between"}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={"blue.400"}>Forgot password?</Link>
                                </Stack>
                                <Button
                                    isLoading={isSubmitting}
                                    loadingText="Signing in..."
                                    bg={"blue.400"}
                                    color={"white"}
                                    type="submit"
                                    _hover={{
                                        bg: "blue.500",
                                    }}>
                                    Sign in
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={"center"}>
                                    Not a user yet?{" "}
                                    <Link
                                        color={"blue.400"}
                                        href={`registration${
                                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                            router.query.callbackUrl
                                                ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                                                  `?callbackUrl=${router.query.callbackUrl}`
                                                : ""
                                        }`}>
                                        Register
                                    </Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
}
