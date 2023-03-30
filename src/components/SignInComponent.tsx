import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { logger } from "tools/logger";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Eye, EyeSlash, Mailbox } from "react-bootstrap-icons";

const offeye = <EyeSlash width="26" height="26" />;
const eye = <Eye width="26" height="26" />;
const mailbox = <Mailbox width="26" height="26" />;

const SignInComponent = () => {
    const router = useRouter();
    const { status } = useSession();

    const [passwordShow, setPasswordShow] = useState(false);
    const togglePasswordShow = () => {
        setPasswordShow(!passwordShow);
    };

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

            console.log(body);
            console.log(router.query);

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
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="p-4 bg-white rounded shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Вход</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Электронная почта</Form.Label>
                        <InputGroup>
                            <InputGroup.Text> {mailbox} </InputGroup.Text>
                            <Form.Control
                                isInvalid={Boolean(router.query.error)}
                                className="form-control"
                                placeholder="введите адрес электронной почты, указанный при регистрации"
                                type="email"
                                {...register("username", { required: true })}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Пароль</Form.Label>
                        <InputGroup>
                            <Form.Control
                                isInvalid={Boolean(router.query.error)}
                                className="form-control"
                                placeholder="введите пароль, указанный при регистрации"
                                type={passwordShow ? "text" : "password"}
                                {...register("password", { required: true })}
                            />
                            <InputGroup.Text onClick={togglePasswordShow}>
                                {passwordShow ? eye : offeye}
                            </InputGroup.Text>
                        </InputGroup>
                        {router.query.error && router.query.error === "CredentialsSignin" && (
                            <Form.Control.Feedback type="invalid">Неверные данные</Form.Control.Feedback>
                        )}
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Войти"}
                        </Button>
                    </div>
                </Form>
                <p className="mt-3 text-center">
                    Not a user yet?{" "}
                    <Link
                        className="text-primary"
                        href={`registration${
                            router.query.callbackUrl ? `?callbackUrl=${router.query.callbackUrl as string}` : ""
                        }`}>
                        Зарегистрироваться
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInComponent;
