// import { IDogData } from "./types";
// import { apiRoot } from "../api";
import { NEXTAUTH_URL } from "src/redux/api";

export const getDogDataFromApi = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const res = await (
        await fetch(`${NEXTAUTH_URL}/api/dog`, {
            method: "GET",
        })
    ).json();
    console.log(res);
};
