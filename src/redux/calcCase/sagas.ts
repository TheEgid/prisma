import { call, put, takeEvery } from "typed-redux-saga";
import { CalcCaseActionTypes, ICalcCaseFormInput, TCalcCasehAction } from "./types";
import { calcCaseLoading, calcCaseError, calcCaseFetchAll, calcCaseFetchAllByEmail } from "./slices";

const fetchAll = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await (await fetch(`/api/calc-case`, { method: "GET" })).json();
    return JSON.stringify(result);
};

const fetchById = async (email: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await (await fetch(`/api/calc-case/${email}`, { method: "GET" })).json();
    return JSON.stringify(result);
};

const fetchCalcCaseAllSaga = function* () {
    try {
        yield* put(calcCaseLoading());
        const response = yield* call(fetchAll);
        yield* put(calcCaseFetchAll(response));
    } catch (error) {
        yield* put(calcCaseError());
    }
};

const fetchCalcCaseByEmailSaga = function* (props: TCalcCasehAction<ICalcCaseFormInput>) {
    const email = props.payload;
    console.log(email);

    try {
        yield* put(calcCaseLoading());
        const response = yield* call(fetchById, email.email);
        yield* put(calcCaseFetchAllByEmail(response));
    } catch (error) {
        yield* put(calcCaseError());
    }
};

export const watchCalcCase = function* () {
    yield* takeEvery(CalcCaseActionTypes.CALC_CASE_ALL, fetchCalcCaseAllSaga);
    yield* takeEvery(CalcCaseActionTypes.CALC_CASE_ALL_BY_EMAIL, fetchCalcCaseByEmailSaga);
};
