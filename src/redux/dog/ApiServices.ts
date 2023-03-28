export const getDogDataFromApi = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars
    const res = await (await fetch(`/api/dog`, { method: "GET" })).json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log(res.name);
};
