import { RootState } from "../store";

export const getReduxCalcCaseData = (state: RootState) => state.dogSliceReducer.calcCaseData;
