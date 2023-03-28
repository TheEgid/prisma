import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { logger } from "tools/logger";
import { Button, Nav, Navbar, NavLink } from "react-bootstrap";

const Header = () => {
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;

    const { data: session, status } = useSession();

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    let left = (
        <Nav>
            <NavLink href="/" active={isActive("/")}>
                Feed
            </NavLink>
        </Nav>
    );

    let right = null;

    if (status === "loading") {
        left = (
            <NavLink href="/" active={isActive("/")}>
                Feed
            </NavLink>
        );
        right = <p>Validating session...</p>;
    }

    if (!session) {
        right = (
            <Nav>
                <Button onClick={() => signIn()}>Log in</Button>
            </Nav>
        );
    }

    if (session) {
        left = (
            <>
                <Nav>
                    <NavLink href="/" active={isActive("/")}>
                        Feed
                    </NavLink>
                    <NavLink href="/drafts" active={isActive("/drafts")}>
                        My drafts
                    </NavLink>
                </Nav>
            </>
        );
        right = (
            <>
                <Nav>
                    <NavLink href="/create" active={isActive("/create")}>
                        New post
                    </NavLink>
                    <NavLink href="#" onClick={() => signOut()}>
                        Log out
                    </NavLink>
                </Nav>
            </>
        );
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <NavLink href="/">
                    <Navbar.Brand>Blog</Navbar.Brand>
                </NavLink>
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

// const Header: React.FC = () => {
//     const router = useRouter();
//     const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;

//     const { data: session, status } = useSession();
//     logger.debug(session);
//     let left = (
//         <HStack>
//             <Link href="/" legacyBehavior>
//                 <a className="bold" data-active={isActive("/")}>
//                     Feed
//                 </a>
//             </Link>
//         </HStack>
//     );

//     let right = null;

//     if (status == "loading") {
//         left = (
//             <div>
//                 <Link href="/" legacyBehavior>
//                     <a data-active={isActive("/")}>Feed</a>
//                 </Link>
//             </div>
//         );
//         right = (
//             <div>
//                 <p>Validating session ...</p>
//                 <style>{`
//                     .right {
//                         margin-left: auto;
//                     }
//                 `}</style>
//             </div>
//         );
//     }

//     if (!session) {
//         right = (
//             <HStack>
//                 <Button onClick={() => signIn()}>Log in</Button>
//             </HStack>
//         );
//     }

//     if (session) {
//         left = (
//             <HStack>
//                 <Link href="/" legacyBehavior>
//                     <a data-active={isActive("/")}>Feed</a>
//                 </Link>
//                 <Link href="/drafts" legacyBehavior>
//                     <a data-active={isActive("/drafts")}>My drafts</a>
//                 </Link>
//             </HStack>
//         );
//         right = (
//             <HStack>
//                 <p>
//                     {session.user && session.user.name} ({session.user && session.user.email})
//                 </p>
//                 <Link href="/create" passHref legacyBehavior>
//                     <Button>
//                         <a>New post</a>
//                     </Button>
//                 </Link>
//                 <Button
//                     onClick={() => {
//                         logger.debug("callbackUrl: ", router.basePath);
//                         void signOut();
//                     }}>
//                     Log out
//                 </Button>
//             </HStack>
//         );
//     }

//     return (
//         <nav>
//             <HStack p={5} justify="space-between" borderBottom="1px solid" shadow="md">
//                 {left}
//                 {right}
//             </HStack>
//         </nav>
//     );
// };

export default Header;
