// import { IDogData } from "./types";
// import { apiRoot } from "../api";

export const getDogDataFromApi = async () => {
    // return apiRoot.get("some-path").json();
    // const res = ""
    const res = await fetch(`http://localhost:3000/api/dog`, {
        method: "GET",
    });
    console.log(res);
};
