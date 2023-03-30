export enum CalcCaseActionTypes {
    CALC_CASE_START = "CALC_CASE_START",
}

export interface ICalcCaseState {
    calcCaseData: string;
    loading: boolean;
    error: boolean;
}
