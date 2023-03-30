import { call, put, takeLatest } from "typed-redux-saga";
import { calcCaseLoading, calcCaseError, calcCaseFetch } from "./slices";
import { CalcCaseActionTypes } from "./types";

const getcalcCaseDataFromApi = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await (await fetch(`/api/calc-case`, { method: "GET" })).json();
    return JSON.stringify(result);
};

const fetchCalcCaseSaga = function* () {
    try {
        yield* put(calcCaseLoading()); //??
        const response = yield* call(getcalcCaseDataFromApi);
        yield* put(calcCaseFetch(response));
    } catch (error) {
        yield* put(calcCaseError());
    }
};

export const watchFetchCalcCase = function* () {
    yield* takeLatest(CalcCaseActionTypes.CALC_CASE_START, fetchCalcCaseSaga);
};
