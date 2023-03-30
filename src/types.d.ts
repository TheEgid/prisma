import { CalcUnit, ContractData, ObjectData, User } from "@prisma/client";

export type TCalcCaseResult = CalcUnit & {
    contractData: ContractData | null;
    objectData: ObjectData[] | null;
    author: User | null;
};
