import React from "react";
import Link from "next/link";
import { Nav, Navbar } from "react-bootstrap";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { logger } from "tools/logger";

const Header = () => {
    const router = useRouter();

    const { data: session, status } = useSession();
    logger.debug(session);

    const getLinkClassName = (path: string) => {
        return router.pathname === path ? "nav-link active" : "nav-link";
    };

    let left = (
        <Nav>
            <Link className={getLinkClassName("/")} href="/">
                Feed
            </Link>
        </Nav>
    );

    let right = null;

    if (status === "loading") {
        left = (
            <Nav>
                <Link className={getLinkClassName("/")} href="/">
                    Feed
                </Link>
            </Nav>
        );
        right = <p>Validating session...</p>;
    }

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
            <>
                <Nav>
                    <Link className={getLinkClassName("/")} href="/">
                        Feed
                    </Link>
                    <Link className={getLinkClassName("/drafts")} href="/drafts">
                        My drafts
                    </Link>
                </Nav>
            </>
        );
        right = (
            <>
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
            </>
        );
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Link href="/">
                    <Navbar.Brand>Калькулятор</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <div>{left}</div>
                        <div>{right}</div>
                    </div>
                </Navbar.Collapse>
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
