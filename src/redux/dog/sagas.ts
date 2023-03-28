import { call, put, takeLatest } from "typed-redux-saga";
import { dogLoading, dogFetch, dogError } from "./slices";
import { getDogDataFromApi } from "./ApiServices";
import { DogActionTypes } from "./types";

const fetchDogSaga = function* () {
    try {
        yield* put(dogLoading());

        // const response = yield* call(getDogDataFromApi);

        yield* call(getDogDataFromApi);
        // yield* put(dogFetch(response));
    } catch (error) {
        yield* put(dogError());
    }
};

export const watchFetchDog = function* () {
    yield* takeLatest(DogActionTypes.FETCH_DOG_START, fetchDogSaga);
};
