import React from "react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { logger } from "tools/logger";
import { Button, Form, FormGroup, FormLabel, InputGroup } from "react-bootstrap";
import { PersonBadge, Eye, EyeSlash, Mailbox } from "react-bootstrap-icons";

const offeye = <EyeSlash width="26" height="26" />;
const eye = <Eye width="26" height="26" />;
const mailbox = <Mailbox width="26" height="26" />;
const person = <PersonBadge width="26" height="26" />;

export default function RegistrationCard() {
    const [passwordShow, setPasswordShow] = useState(false);
    const togglePasswordShow = () => {
        setPasswordShow(!passwordShow);
    };

    const router = useRouter();

    const {
        handleSubmit,
        register,
        reset,
        formState: { isSubmitting },
    } = useForm();

    async function onSubmit(values: any) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const submittedValues = { ...values };
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            const body = { ...{ name: submittedValues.email as string }, ...submittedValues };

            logger.debug(`POSTing ${JSON.stringify(body, null, 2)}`);

            const res = await fetch(`/api/user/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            logger.debug(`res`, res);
            reset();
            // eslint-disable-next-line sonarjs/no-nested-template-literals, @typescript-eslint/restrict-template-expressions
            void router.push(`signin${router.query.callbackUrl ? `?callbackUrl=${router.query.callbackUrl}` : ""}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="p-4 bg-white rounded shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Регистрация</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Электронная почта</Form.Label>
                        <InputGroup>
                            <InputGroup.Text> {mailbox} </InputGroup.Text>
                            <Form.Control
                                className="form-control"
                                placeholder="введите адрес электронной почты"
                                type="email"
                                {...register("email", { required: true })}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Пароль</Form.Label>
                        <InputGroup>
                            <InputGroup.Text onClick={togglePasswordShow}>
                                {passwordShow ? eye : offeye}
                            </InputGroup.Text>
                            <Form.Control
                                className="form-control"
                                placeholder="введите пароль"
                                type={passwordShow ? "text" : "password"}
                                {...register("password", { required: true })}
                            />
                        </InputGroup>
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Зарегистрироваться"}
                        </Button>
                    </div>
                </Form>
                <p className="mt-3 text-center">
                    Already a user?{" "}
                    <a href="signin" className="text-primary">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
