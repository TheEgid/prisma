import { CalcUnit, ContractData, ObjectData } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "tools/db";

type CalcCaseResult = CalcUnit & {
    contractData: ContractData | null;
    objectData: ObjectData[] | null;
};

// POST /api/calc-case
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const { title, content } = req.body;
    const session = await getSession({ req });

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

    if (req.method === "GET") {
        if (session) {
            const result: CalcCaseResult[] = await prisma.calcUnit.findMany({
                include: { contractData: true, objectData: true },
            });

            res.json(result);
            //     //     where: {
            //     //         published: true,
            //     //     },
        }
    } else {
        res.status(405).send({ message: "Method not allowed" });
    }
}
