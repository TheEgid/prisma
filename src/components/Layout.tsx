import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";

type Props = {
    children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
    <Container fluid>
        <Header />
        {props.children}
    </Container>
);

export default Layout;
