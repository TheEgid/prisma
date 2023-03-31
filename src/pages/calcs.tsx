import React from "react";
import Layout from "src/components/Layout";
// import { wrapper } from "src/redux/store";
import TableCalcComponent from "src/components/TableCalcComponent";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

type Props = {
    email: string;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });

    const email = session?.user?.email as string;

    if (!session || !session.user) {
        res.statusCode = 403;
        return { props: { email: null } };
    }

    return { props: { email: email } };
};

const CalcsPage: React.FC<Props> = (props) => {
    const email = props.email;
    const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

    if (!email || !isEmail) {
        return <div>You need to be authenticated to view this page.</div>;
    } else {
        return (
            <>
                <Layout>
                    <div>CalcsPage</div>
                    {isEmail && <TableCalcComponent email={email} />}
                </Layout>
            </>
        );
    }
};

export default CalcsPage;
