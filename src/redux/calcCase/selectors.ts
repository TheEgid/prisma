import { RootState } from "../store";

export const getReduxCalcCaseDataAllByEmail = (state: RootState) => state.calcCaseSliceReducer.calcCaseDataAllByEmail;
