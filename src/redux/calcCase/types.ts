export enum CalcCaseActionTypes {
    CALC_CASE_ALL = "CALC_CASE_ALL",
    CALC_CASE_ALL_BY_EMAIL = "CALC_CASE_ALL_BY_EMAIL",
}

export interface ICalcCaseState {
    calcCaseDataAll: string;
    calcCaseDataAllByEmail: string;
    loading: boolean;
    error: boolean;
}

export type TCalcCasehAction<Payload> = {
    type: CalcCaseActionTypes;
    payload: Payload;
};

export interface ICalcCaseFormInput {
    email: string;
}
