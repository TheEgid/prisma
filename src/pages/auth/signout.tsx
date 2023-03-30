import React from "react";
import { GetStaticProps } from "next";
import { signOut } from "next-auth/react";
import { logger } from "tools/logger";

interface LogoutProps {
    callbackUrl: string;
}

export default function logout({ callbackUrl }: LogoutProps) {
    logger.debug(`callbackUrl: ${callbackUrl}`);
    void signOut({ callbackUrl });
    return <></>;
}

// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
export const getStaticProps = async (context: GetStaticProps) => ({
    props: { callbackUrl: process.env.NEXTAUTH_URL }, // will be passed to the page component as props
});
