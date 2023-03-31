import { PayloadAction, createSlice, createAction } from "@reduxjs/toolkit";
import { CalcCaseActionTypes, ICalcCaseState } from "./types";

export const fetchCalcCaseStartAll = createAction<string>(CalcCaseActionTypes.CALC_CASE_ALL);
export const fetchCalcCaseStartAllByEmail = createAction<string>(CalcCaseActionTypes.CALC_CASE_ALL_BY_EMAIL);

const initialState: ICalcCaseState = {
    calcCaseDataAll: "no data",
    calcCaseDataAllByEmail: "no data",
    loading: false,
    error: false,
};

export const calcCaseSlice = createSlice({
    name: "calcCaseSlice",
    initialState,
    reducers: {
        calcCaseLoading(state) {
            state.loading = true;
            state.error = false;
        },
        calcCaseFetchAll(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = false;
            state.calcCaseDataAll = action.payload;
        },
        calcCaseFetchAllByEmail(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = false;
            state.calcCaseDataAllByEmail = action.payload;
        },
        calcCaseError(state) {
            state.loading = false;
            state.error = true;
        },
    },
});

export const { calcCaseFetchAllByEmail, calcCaseFetchAll, calcCaseLoading, calcCaseError } = calcCaseSlice.actions;

export const calcCaseSliceReducer = calcCaseSlice.reducer;

export type TCalcCaseSliceReducer = typeof calcCaseSlice.reducer;
