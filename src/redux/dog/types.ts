export enum DogActionTypes {
    FETCH_DOG_START = "FETCH_DOG_START",
}

export interface IDogState {
    calcCaseData: string;
    loading: boolean;
    error: boolean;
}

// export interface IDogData {
//     message: string;
//     status: string;
// }
