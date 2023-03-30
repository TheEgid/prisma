import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "tools/db";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // const findFirst = await prisma.calcUnit.findFirst(); //findMany

    const findFirst = await prisma.calcUnit.findFirst({
        include: { contractData: true, objectData: true },
    });

    //     where: {
    //         published: true,
    //     },

    res.json(findFirst);
}
