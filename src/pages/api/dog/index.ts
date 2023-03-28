import type { NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
import { prisma } from "tools/db";

// eslint-disable-next-line @typescript-eslint/require-await
async function handleGET(res: NextApiResponse<any>) {
    // const user = await prisma.user.findUnique({
    //     where: { id: String(userId) },
    // });
    res.json({ mt: 77 });
}

export default handleGET;
