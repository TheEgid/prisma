import { AnyAction, CombinedState, combineReducers, Reducer } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { calcCaseSliceReducer } from "./calcCase/slices";
import { ICalcCaseState } from "./calcCase/types";

const combinedReducer = combineReducers({
    calcCaseSliceReducer,
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
        calcCaseSliceReducer: ICalcCaseState;
    }>,
    AnyAction
>;
