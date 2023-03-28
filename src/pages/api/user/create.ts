import type { NextApiRequest, NextApiResponse } from "next";
import sha256 from "crypto-js/sha256";
import { logger } from "tools/logger";
import { prisma } from "tools/db";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        await handlePOST(res, req);
    } else {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
}

const hashPassword = (password: string) => {
    return sha256(password).toString();
};

// POST /api/user
async function handlePOST(res: NextApiResponse<any>, req: NextApiRequest) {
    logger.debug("creating user", {
        ...req.body,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        password: hashPassword(req.body.password),
    });
    const user = await prisma.user.create({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
        data: { ...req.body, password: hashPassword(req.body.password) },
    });
    res.json(user);
}
