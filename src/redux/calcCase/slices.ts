import { PayloadAction, createSlice, createAction } from "@reduxjs/toolkit";
import { CalcCaseActionTypes, ICalcCaseState } from "./types";

export const fetchcalcCaseStart = createAction(CalcCaseActionTypes.CALC_CASE_START);

const initialState: ICalcCaseState = {
    calcCaseData: "",
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
        calcCaseFetch(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = false;
            state.calcCaseData = action.payload;
        },
        calcCaseError(state) {
            state.loading = false;
            state.error = true;
        },
    },
});

export const { calcCaseLoading, calcCaseFetch, calcCaseError } = calcCaseSlice.actions;

export const calcCaseSliceReducer = calcCaseSlice.reducer;

export type TCalcCaseSliceReducer = typeof calcCaseSlice.reducer;
