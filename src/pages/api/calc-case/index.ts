import { CalcUnit, ContractData, ObjectData, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "tools/db";

type TCalcCaseResult = CalcUnit & {
    contractData: ContractData | null;
    objectData: ObjectData[] | null;
    author: User | null;
};

// GET /api/calc-case
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // const { title, content } = req.body;
    const session = await getSession({ req });

    if (req.method === "GET") {
        if (session) {
            const result: TCalcCaseResult[] = await prisma.calcUnit.findMany({
                include: { contractData: true, objectData: true, author: true },
            });
            res.json(result);
            //     //     where: {
            //     //         published: true,
            //     //     },
        }
    } else {
        res.status(405).send({ message: "Method not allowed" });
    }

    // if (req.method === "POST") {
    //     if (session) {
    //         const result = await prisma.post.create({
    //             data: {
    //                 title: title as string,
    //                 content: content as string,
    //                 author: { connect: { email: session?.user?.email as string } },
    //             },
    //         });
    //         res.json(result);
    //     } else {
    //         res.status(401).send({ message: "Unauthorized" });
    //     }
    // }
}
