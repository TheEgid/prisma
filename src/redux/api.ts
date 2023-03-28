// import ky, { BeforeErrorHook, BeforeRequestHook, BeforeRetryHook } from "ky-universal";
// import { useRouter } from "next/router";
// import { getCookie } from "typescript-cookie";
// import { getUser } from "./auth/user/selectors";
// import { UserLogOut, UserRefreshSuccess } from "./auth/user/slices";
// import { IErrorResponse, ILoginResponse, IUser } from "./auth/user/types";
// import { RootState, store } from "./store";

// const apiPathUrl = "/api/";

// const env = process.env.NODE_ENV;

// const apiUrl = env === "development" ? `http://localhost:3000${apiPathUrl}` : apiPathUrl;

// export const apiFileUrl = apiUrl.replace("/api/", "/files/");

// const beforeRequest: BeforeRequestHook = (request) => {
//     const currentUser = getUser(store.getState() as RootState) as IUser;

//     if (currentUser && currentUser.accessToken) {
//         request.headers.set("Authorization", `Bearer ${currentUser.accessToken}`);
//     }
// };

// const beforeError: BeforeErrorHook = async (error) => {
//     const { response } = error;

//     if (response && response.body) {
//         const customError = (await response.json()) as IErrorResponse;

//         error.name = customError.error;
//         error.message = customError.message;
//     }

//     return error;
// };

// const beforeRetry: BeforeRetryHook = async () => {
//     const currentRefreshToken = getCookie("refreshToken");

//     if (currentRefreshToken) {
//         const currentUser = getUser(store.getState() as RootState) as IUser;
//         const tokens: ILoginResponse = await ky
//             .post(`${apiUrl}auth/refresh`, {
//                 headers: {
//                     Authorization: `Bearer ${currentRefreshToken}`,
//                 },
//             })
//             .json();
//         const updatedUser = { ...currentUser, ...tokens } as IUser;

//         store.dispatch(UserRefreshSuccess(updatedUser));
//     } else {
//         store.dispatch(UserLogOut());
//         const router = useRouter();
//         void router.push("/");
//     }
// };

// export const apiRoot = ky.create({
//     prefixUrl: apiUrl,
//     credentials: "include",
//     headers: {
//         "Access-Control-Allow-Origin": "*",
//         "X-UA-Compatible": "IE=edge",
//     },
//     retry: {
//         limit: 3,
//         methods: ["get", "post"],
//         statusCodes: [403],
//         backoffLimit: 3000,
//     },
//     hooks: {
//         beforeRequest: [beforeRequest],
//         beforeError: [beforeError],
//         beforeRetry: [beforeRetry],
//     },
// });

export {};
