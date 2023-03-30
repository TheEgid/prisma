import { PayloadAction, createSlice, createAction } from "@reduxjs/toolkit";
import { DogActionTypes, IDogState } from "./types";

export const fetchDogStart = createAction(DogActionTypes.FETCH_DOG_START);

const initialState: IDogState = {
    calcCaseData: "",
    loading: false,
    error: false,
};

export const dogSlice = createSlice({
    name: "dogSlice",
    initialState,
    reducers: {
        dogLoading(state) {
            state.loading = true;
            state.error = false;
        },
        dogFetch(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = false;
            state.calcCaseData = action.payload;
        },
        dogError(state) {
            state.loading = false;
            state.error = true;
        },
    },
});

export const { dogLoading, dogFetch, dogError } = dogSlice.actions;

export const dogSliceReducer = dogSlice.reducer;

export type TDogSliceReducer = typeof dogSlice.reducer;
