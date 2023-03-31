import { CalcUnit, ContractData, ObjectData } from "@prisma/client";

export type TCalcCaseResult = CalcUnit & {
    contractData: ContractData | null;
    objectData: ObjectData[];
    author: {
        email: string | null;
    } | null;
};
