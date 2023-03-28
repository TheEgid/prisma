import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
// import { getSession } from "next-auth/react";
import { prisma } from "tools/db";

// eslint-disable-next-line @typescript-eslint/require-await
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const { title, content } = req.body;

    const session = await getSession({ req });
    if (!session) {
        const result = { fromMee: "qw" };
        // await prisma.post.create({
        //     data: {
        //         title: title as string,
        //         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        //         content: content,
        //         author: { connect: { email: session?.user?.email as string } },
        //     },
        // });
        res.json(result);
    } else {
        res.status(401).send({ message: "Unauthorized" });
    }
}
