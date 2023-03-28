// import { IDogData } from "./types";
// import { apiRoot } from "../api";

export const getDogDataFromApi = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const res = await (
        await fetch(`http://localhost:3006/api/dog`, {
            method: "GET",
        })
    ).json();
    console.log(res);
};
