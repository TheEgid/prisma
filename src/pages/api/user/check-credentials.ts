import sha256 from "crypto-js/sha256";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "tools/db";
import { logger } from "tools/logger";

const omit = <T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> => {
    const o = { ...obj };
    keys.forEach((key) => delete o[key]);
    return o;
};

const hashPassword = (password: string) => {
    return sha256(password).toString();
};

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        await handlePOST(res, req);
    } else {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
}

// POST /api/user
async function handlePOST(res: NextApiResponse<any>, req: NextApiRequest) {
    const user = await prisma.user.findUnique({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        where: { email: req.body.username },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            password: true,
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    if (user && user.password == hashPassword(req.body.password)) {
        logger.debug("password correct");
        res.json(omit(user, "password"));
    } else {
        logger.debug("incorrect credentials");
        res.status(400).end("Invalid credentials");
    }
}
