import React, { useEffect, useState } from "react";
import Layout from "src/components/Layout";
import { Button, Table } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getReduxCalcCaseDataAllByEmail } from "src/redux/calcCase/selectors";
import { useSession } from "next-auth/react";
import { TCalcCaseResult } from "src/types";
import { calcCaseFetchAllByEmail, fetchCalcCaseStartAllByEmail } from "src/redux/calcCase/slices";
import { wrapper } from "src/redux/store";

export interface IRegisteredVisitor {
    id: string;
    email: string;
    isEmailConfirmed: boolean;
    role: string;
    createdAt: string;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString().slice(0, 5);
};

// function addHoursToIsoDate(isoDate: Date | undefined): string | undefined {
//     if (!isoDate) {
//         return;
//     }
//     const date = new Date(isoDate);
//     date.setHours(date.getHours() + 3);
//     return date.toISOString();
// }

const visitors: IRegisteredVisitor[] = [
    {
        id: "50499887-22e5-481f-8bc9-5d299183fceb",
        email: "ytyyy@gmail.com",
        isEmailConfirmed: true,
        role: "guest",
        createdAt: "2023-01-07 16:38:13.000",
    },
    {
        id: "999yy9887-22e5-481f-8bc9-5d299183fceb",
        email: "nmtyy@gmail.com",
        isEmailConfirmed: false,
        role: "admin",
        createdAt: "2023-02-07 18:38:13.000",
    },
];

const tableHeads = ["#", "createdAt", "email", "confirmed", "role", "id", "operations"];

const TableMain = () => {
    const dispatch = useDispatch();
    const [selectedVisitorId, setSelectedVisitorId] = useState("");

    const { data: session } = useSession();

    if (!session || !session?.user?.email) {
        return <div>You need to be authenticated to view this page.</div>;
    }

    const sortedVisitors = [...visitors].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const handleIdClick = (id: string) => {
        console.log(`ID clicked: ${id}`);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleDeleteClick = (id: string) => {
        setSelectedVisitorId(id);
    };

    const handleConfirmDelete = () => {
        // Perform delete operation
        console.log(`Visitor with ID ${selectedVisitorId} deleted!`);
        setSelectedVisitorId("");
    };

    const email = session?.user?.email;
    console.log(email);

    // if (email) {
    dispatch(fetchCalcCaseStartAllByEmail(email));
    // }

    return (
        <>
            {selectedVisitorId && (
                <div>
                    <p>Are you sure you want to delete this visitor?</p>
                    <Button onClick={handleConfirmDelete}>Yes</Button>
                    <Button onClick={() => setSelectedVisitorId("")}>No</Button>
                </div>
            )}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {tableHeads.map((head, index) => (
                            <th key={index}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedVisitors.map((visitor, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{formatDate(visitor.createdAt)}</td>
                            <td>{visitor.email}</td>
                            <td>{String(visitor.isEmailConfirmed)}</td>
                            <td style={{ color: visitor.role === "admin" ? "red" : "inherit" }}>{visitor.role}</td>
                            <td>{visitor.id}</td>
                            <td>
                                <a href="#" onClick={() => handleIdClick(visitor.id)}>
                                    Click me
                                </a>
                                {"\u00A0"}
                                <a href="#" onClick={() => "return false;"}>
                                    {/* <a href="#" onClick={() => handleDeleteClick(visitor.id)}> */}
                                    Delete
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

const CalcsPage: React.FC = () => {
    // useEffect(() => {

    //     // console.log(parsed.at(0)?.contractData?.contractContent);
    // }, []);

    const selected = useSelector(getReduxCalcCaseDataAllByEmail, shallowEqual);
    // const parsed = JSON.parse(selected) as TCalcCaseResult[];
    console.log(selected);

    return (
        <>
            <Layout>
                <div>CalcsPage</div>
                {"\u00A0"}
                <TableMain />
            </Layout>
        </>
    );
};

// CalcsPage.getInitialProps = wrapper.getInitialPageProps(() => () => {
//     return {};
// });

export default CalcsPage;
