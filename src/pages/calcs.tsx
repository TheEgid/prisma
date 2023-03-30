import React, { useState } from "react";
import Layout from "src/components/Layout";
// import { GetServerSideProps } from "next";
// import Layout from "../components/Layout";
// import Post, { PostProps } from "../components/Post";
// import { useSession, getSession } from "next-auth/react";
// import { prisma } from "tools/db";

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

import { Button, Table } from "react-bootstrap";

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

const sortedVisitors = [...visitors].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

const tableHeads = ["#", "createdAt", "email", "confirmed", "role", "id", "operations"];

const TableMain = () => {
    const [selectedVisitorId, setSelectedVisitorId] = useState<string | null>(null);

    const handleIdClick = (id: string) => {
        console.log(`ID clicked: ${id}`);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleDeleteClick = (id: string) => {
        setSelectedVisitorId(id);
    };

    const handleConfirmDelete = () => {
        // Perform delete operation
        console.log(`Visitor with ID ${selectedVisitorId as string} deleted!`);
        setSelectedVisitorId(null);
    };

    return (
        <>
            {selectedVisitorId && (
                <div>
                    <p>Are you sure you want to delete this visitor?</p>
                    <Button onClick={handleConfirmDelete}>Yes</Button>
                    <Button onClick={() => setSelectedVisitorId(null)}>No</Button>
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

const CalcsPage = () => {
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

export default CalcsPage;
