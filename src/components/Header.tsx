import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button, HStack } from "@chakra-ui/react";
import { logger } from "tools/logger";

const Header: React.FC = () => {
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;

    const { data: session, status } = useSession();
    logger.debug(session);
    let left = (
        <HStack>
            <Link href="/" legacyBehavior>
                <a className="bold" data-active={isActive("/")}>
                    Feed
                </a>
            </Link>
        </HStack>
    );

    let right = null;

    if (status == "loading") {
        left = (
            <div>
                <Link href="/" legacyBehavior>
                    <a data-active={isActive("/")}>Feed</a>
                </Link>
            </div>
        );
        right = (
            <div>
                <p>Validating session ...</p>
                <style>{`
                    .right {
                        margin-left: auto;
                    }
                `}</style>
            </div>
        );
    }

    if (!session) {
        right = (
            <HStack>
                <Button onClick={() => signIn()}>Log in</Button>
            </HStack>
        );
    }

    if (session) {
        left = (
            <HStack>
                <Link href="/" legacyBehavior>
                    <a data-active={isActive("/")}>Feed</a>
                </Link>
                <Link href="/drafts" legacyBehavior>
                    <a data-active={isActive("/drafts")}>My drafts</a>
                </Link>
            </HStack>
        );
        right = (
            <HStack>
                <p>
                    {session.user && session.user.name} ({session.user && session.user.email})
                </p>
                <Link href="/create" passHref legacyBehavior>
                    <Button>
                        <a>New post</a>
                    </Button>
                </Link>
                <Button
                    onClick={() => {
                        logger.debug("callbackUrl: ", router.basePath);
                        void signOut();
                    }}>
                    Log out
                </Button>
            </HStack>
        );
    }

    return (
        <nav>
            <HStack p={5} justify="space-between" borderBottom="1px solid" shadow="md">
                {left}
                {right}
            </HStack>
        </nav>
    );
};

export default Header;
