import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getReduxCalcCaseDataAllByEmail } from "src/redux/calcCase/selectors";
import { fetchCalcCaseStartAllByEmail } from "src/redux/calcCase/slices";
import { TCalcCaseResult } from "src/types";

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString().slice(0, 5);
};

interface IRegisteredCalcCase {
    id: string;
    cnt: number;
    author: string;
    createdAt: string;
    updatedAt: string;
    objectExtraContent: string;
    objectMainContent: string;
    contractContent: string;
}

interface ITableCalcComponentProps {
    email: string;
}

interface ITableMainProps {
    tableBodies: IRegisteredCalcCase[];
    tableHeads: string[];
}

const TableMain = ({ tableBodies, tableHeads }: ITableMainProps) => {
    const [selectedUnitId, setSelectedUnitId] = useState("");

    const handleIdClick = (id: string) => {
        console.log(`ID clicked: ${id}`);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const handleDeleteClick = (id: string) => {
    //     setSelectedUnitId(id);
    // };

    // const handleConfirmDelete = () => {
    //     // Perform delete operation
    //     console.log(`Unit with ID ${selectedUnitId} deleted!`);
    //     setSelectedUnitId("");
    // };

    // const sortedUnits = [...Units].sort(
    //     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    // );

    return (
        <>
            {selectedUnitId && (
                <div>
                    <p>Are you sure you want to delete this unit?</p>
                    {/* <Button onClick={handleConfirmDelete}>Yes</Button> */}
                    <Button onClick={() => setSelectedUnitId("")}>No</Button>
                </div>
            )}
            <Table striped bordered hover size="sm" style={{ fontSize: 11 }}>
                <thead>
                    <tr>
                        {tableHeads.map((head, index) => (
                            <th key={index}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableBodies.map((unit, index) => (
                        <tr key={index}>
                            <td>{unit.cnt}</td>
                            <td>{unit.createdAt}</td>
                            <td>{unit.updatedAt}</td>
                            <td>{unit.author}</td>
                            <td>{unit.objectMainContent}</td>
                            {/* <td style={{ color: unit.objectExtraContent === "admin" ? "red" : "inherit" }}>{unit.role}</td> */}
                            <td>{unit.objectExtraContent}</td>
                            <td>{unit.contractContent}</td>
                            <td>
                                <a href="#" onClick={() => handleIdClick(unit.id)}>
                                    Click me
                                </a>
                                {"\u00A0"}
                                <a href="#" onClick={() => "return false;"}>
                                    {/* <a href="#" onClick={() => handleDeleteClick(unit.id)}> */}
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

const TableCalcComponent = ({ email }: ITableCalcComponentProps) => {
    const dispatch = useDispatch();

    dispatch(fetchCalcCaseStartAllByEmail(email));

    // const { url, loading, error } = useSelector(getDogSlice);

    const selected = useSelector(getReduxCalcCaseDataAllByEmail, shallowEqual);
    if ("no data" === selected) {
        return <></>;
    }
    // console.log(selected);

    const parsed = JSON.parse(selected) as TCalcCaseResult[];

    const currentResult = parsed.at(0) as TCalcCaseResult;
    const counter = currentResult.objectData.length; ////!!!

    const data = [] as IRegisteredCalcCase[];
    let i = 0;
    while (i < counter) {
        const temp = new Object() as IRegisteredCalcCase;
        temp.cnt = i + 1;
        temp.author = currentResult.author?.email as string;
        temp.createdAt = formatDate(currentResult.createdAt.toString());
        temp.updatedAt = formatDate(currentResult.updatedAt.toString());
        temp.objectExtraContent = currentResult.objectData.at(i)?.objectExtraContent as string;
        temp.objectMainContent = currentResult.objectData.at(i)?.objectMainContent as string;
        temp.contractContent = currentResult.contractData?.contractContent as string;
        temp.id = currentResult.contractData?.id.toString() as string;
        data.push(temp);
        i++;
    }

    const tableHeads = [
        "#",
        "createdAt",
        "updatedAt",
        "author",
        "objectMainContent",
        "objectExtraContent",
        "contractContent",
        "Операции",
    ];

    return (
        <>
            <TableMain tableBodies={data} tableHeads={tableHeads} />
        </>
    );
};

export default TableCalcComponent;
