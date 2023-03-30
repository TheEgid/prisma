import React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";

export interface IRootComponentProps {
    elem: JSX.Element;
    pageName: string;
}

const RootComponent = (props: IRootComponentProps) => {
    const { pageName, elem } = props;

    const documentTitle = `Калькулятор | ${pageName}`;
    return (
        <>
            <Head>
                <title>{documentTitle}</title>
            </Head>
            <Container>{elem}</Container>
        </>
    );
};

export default RootComponent;
