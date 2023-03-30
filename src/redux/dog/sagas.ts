import { call, put, takeLatest } from "typed-redux-saga";
import { dogLoading, dogError, dogFetch } from "./slices";

import { DogActionTypes } from "./types";

const getDogDataFromApi = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await (await fetch(`/api/calc-case`, { method: "GET" })).json();
    return JSON.stringify(result);
};

const fetchDogSaga = function* () {
    try {
        yield* put(dogLoading());

        const response = yield* call(getDogDataFromApi);

        yield* put(dogFetch(response));
    } catch (error) {
        yield* put(dogError());
    }
};

export const watchFetchDog = function* () {
    yield* takeLatest(DogActionTypes.FETCH_DOG_START, fetchDogSaga);
};
