import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "tools/db";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const dog = await prisma.dog.findFirst();
    res.json(dog);
}
