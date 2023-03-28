import { AnyAction, CombinedState, combineReducers, Reducer } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { dogSliceReducer } from "./dog/slices";
import { IDogState } from "./dog/types";

const combinedReducer = combineReducers({
    dogSliceReducer,
});

const rootReducer = (state: any | undefined, action: AnyAction) => {
    if (action.type === HYDRATE) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {
            ...(state || {}),
            ...action.payload,
        };
    } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return combinedReducer(state, action);
    }
};

export default rootReducer as Reducer<
    CombinedState<{
        dogSliceReducer: IDogState;
    }>,
    AnyAction
>;
