import { RootState } from "../store";

export const getReduxCalcCaseData = (state: RootState) => state.calcCaseSliceReducer.calcCaseData;
