/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from "next";
import { TCalcCaseResult } from "src/types";
import { prisma } from "tools/db";
import { getSession } from "next-auth/react";

// GET /api/calc-case/:email
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const email = req.query.email as string;
    const session = await getSession({ req });

    if (req.method === "GET") {
        if (session) {
            const result: TCalcCaseResult[] = await prisma.calcUnit.findMany({
                include: {
                    contractData: true,
                    objectData: true,
                    author: {
                        select: {
                            email: true,
                        },
                    },
                },
                where: {
                    author: {
                        email: email,
                    },
                },
            });
            res.json(result);
        }
    } else {
        res.status(405).send({ message: "Method not allowed" });
    }
}
