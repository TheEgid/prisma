import React from "react";
import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { logger } from "tools/logger";

const Header = () => {
    const router = useRouter();

    const getLinkClassName = (path: string) => {
        return router.pathname === path ? "nav-link active" : "nav-link";
    };

    const FeedLink = () => {
        return (
            <Link className={getLinkClassName("/")} href="/">
                Feed
            </Link>
        );
    };

    const { data: session, status } = useSession();
    logger.debug(session);

    let left = (
        <Nav>
            <FeedLink />
        </Nav>
    );

    let right = status === "loading" ? <p>Validating session...</p> : null;

    if (!session) {
        right = (
            <Nav>
                <Link className={"nav-link"} onClick={() => signIn()} href="#">
                    Войти
                </Link>
            </Nav>
        );
    }

    if (session) {
        left = (
            <Nav>
                <FeedLink />
                <Link className={getLinkClassName("/drafts")} href="/drafts">
                    My drafts
                </Link>
                <Link className={getLinkClassName("/calcs")} href="/calcs">
                    My calculations
                </Link>
            </Nav>
        );
        right = (
            <Nav>
                <Link className={getLinkClassName("/create")} href="/create">
                    New post
                </Link>
                <Link
                    className={"nav-link"}
                    href="#"
                    onClick={() => {
                        logger.debug("callbackUrl: ", router.basePath);
                        void signOut({ callbackUrl: router.basePath });
                    }}>
                    Выйти
                </Link>
            </Nav>
        );
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Link href="/">
                    <Navbar.Brand>Калькулятор</Navbar.Brand>
                </Link>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <div>{left}</div>
                    <div>{right}</div>
                </div>
            </Navbar>
            {session && (
                <small style={{ bottom: 0 }}>
                    {session.user && "Вы вошли как "}
                    <strong style={{ color: "green" }}>{session.user && session.user.email}</strong>
                </small>
            )}
        </>
    );
};

export default Header;
