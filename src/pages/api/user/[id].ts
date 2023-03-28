import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "db";

// eslint-disable-next-line @typescript-eslint/require-await
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.query.id as string;

    if (req.method === "GET") {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        void handleGET(userId, res);
    } else if (req.method === "POST") {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        void handlePOST(userId, res, req);
    } else if (req.method === "DELETE") {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        void handleDELETE(userId, res);
    } else {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
}

// GET /api/user/:id
async function handleGET(userId: string | string[], res: NextApiResponse<any>) {
    const user = await prisma.user.findUnique({
        where: { id: String(userId) },
        // include: { id: true, name: true, email: true, image: true },
    });
    res.json(user);
}

// GET /api/user/:id
async function handlePOST(userId: string | string[], res: NextApiResponse<any>, req: NextApiRequest) {
    const user = await prisma.user.update({
        where: { id: String(userId) },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: { ...req.body },
    });
    return res.json(user);
}

// DELETE /api/user/:id
async function handleDELETE(userId: string, res: NextApiResponse<any>) {
    const user = await prisma.user.delete({
        where: { id: String(userId) },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    res.json(user);
}
